const admin = require('firebase-admin');
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret, defineString } = require('firebase-functions/params');
const { logger } = require('firebase-functions');
const Stripe = require('stripe');
const { Resend } = require('resend');
const webhookSecret = defineSecret('BAKERY_STRIPE_WEBHOOK_SECRET');
const resendApiKey = defineSecret('RESEND_API_KEY');
const fromEmail = defineString('FROM_EMAIL', { default: 'SOURAW <onboarding@resend.dev>' });
const bakeryOrdersEmail = defineString('BAKERY_ORDERS_EMAIL', { default: '' });
exports.bakeryStripeWebhook = onRequest({
  region: 'us-central1', secrets: [webhookSecret, resendApiKey], maxInstances: 10,
}, async (req, res) => {
  if (req.method !== 'POST') { res.status(405).send('Method Not Allowed'); return; }
  let event;
  try {
    event = Stripe.webhooks.constructEvent(req.rawBody, req.headers['stripe-signature'], webhookSecret.value());
  } catch {
    res.status(400).send('Invalid Stripe signature'); return;
  }
  if (event.type !== 'checkout.session.completed' || event.data.object.metadata?.orderType !== 'bakery') {
    res.status(200).json({ received: true, ignored: true }); return;
  }
  try {
    await fulfillBakeryOrder(event.data.object, new Resend(resendApiKey.value()));
    res.status(200).json({ received: true });
  } catch (error) {
    logger.error('Bakery fulfillment failed', { sessionId: event.data.object.id, message: error.message });
    res.status(500).send('Please retry fulfillment');
  }
});

async function fulfillBakeryOrder(session, resend) {
  if (session.payment_status !== "paid") return;
  const orderId = session.metadata.orderId;
  if (!orderId || orderId.includes("/")) throw new Error("Invalid order reference");
  const ref = admin.firestore().collection("bakeryOrders").doc(orderId);
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error("Order not found");
  const order = snapshot.data();
  if (order.uid !== session.metadata.uid || order.total !== session.amount_total || session.currency !== "usd" ||
      (order.sessionId && order.sessionId !== session.id)) throw new Error("Payment does not match order");
  await ref.set({ status: "paid", sessionId: session.id, paidAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
  const details = order.items.map((item) => `${item.name} — ${item.size} ×${item.quantity}`).join("\n");
  const total = (order.total / 100).toFixed(2);
  const send = async (to, subject, text, key) => {
    const result = await resend.emails.send({ from: fromEmail.value(), to, subject, text }, { idempotencyKey: key });
    if (result.error) throw new Error(result.error.message);
  };
  if (!order.customerNotified) {
    await send(session.customer_details?.email || order.customer.email,
      "SOURAW — payment received ♡",
      `Thank you, ${order.customer.name}! We received your payment of $${total} USD.\n\n${details}\n\nRequested date: ${order.customer.deliveryDate || 'To be arranged'}\nWe will contact you to confirm your date and local pickup details.`,
      `bakery-customer-${session.id}`);
    await ref.set({ customerNotified: true }, { merge: true });
  }
  if (bakeryOrdersEmail.value() && !order.ownerNotified) {
    await send(bakeryOrdersEmail.value(), `Paid SOURAW order — $${total}`,
      `${orderId}\n${details}\n\n${order.customer.name}\n${order.customer.email}\n${order.customer.phone}\nRequested date: ${order.customer.deliveryDate}\nNotes: ${order.customer.notes}`,
      `bakery-owner-${session.id}`);
    await ref.set({ ownerNotified: true }, { merge: true });
  }
}
