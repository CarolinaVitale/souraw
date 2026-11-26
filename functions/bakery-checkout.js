const admin = require('firebase-admin');
const { isDeepStrictEqual } = require('node:util');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret, defineString } = require('firebase-functions/params');
const { logger } = require('firebase-functions');
const Stripe = require('stripe');
const { validateOrder } = require('./bakery');
const secret = defineSecret('BAKERY_STRIPE_SECRET_KEY');
const siteUrl = defineString('BAKERY_SITE_URL', { default: 'https://souraw.com' });
const options = { region: 'us-central1', secrets: [secret], maxInstances: 10 };

exports.createBakeryCheckout = onCall(options, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Please refresh and try again.');
  let order;
  try { order = validateOrder(request.data); }
  catch (error) { throw new HttpsError('invalid-argument', error.message); }
  const requestId = request.data.requestId;
  if (typeof requestId !== 'string' || !/^[a-zA-Z0-9-]{16,80}$/.test(requestId)) {
    throw new HttpsError('invalid-argument', 'Invalid checkout request.');
  }
  // Deterministic reference and Stripe idempotency protect retries from duplicate sessions.
  const ref = admin.firestore().collection('bakeryOrders').doc(`${request.auth.uid}_${requestId}`);
  const stripe = new Stripe(secret.value());
  try {
    const saved = await ref.get();
    if (!saved.exists) {
      try {
        await ref.create({ ...order, uid: request.auth.uid, status: 'pending', createdAt: admin.firestore.FieldValue.serverTimestamp() });
      } catch (error) {
        // 6 = ALREADY_EXISTS: a parallel request (double click) created it first; continue with that one.
        if (error.code !== 6) throw error;
      }
    }
    const stored = (await ref.get()).data();
    if (!isDeepStrictEqual(stored.items, order.items) || !isDeepStrictEqual(stored.customer, order.customer)) {
      throw new HttpsError('failed-precondition', 'Your cart changed. Please try again.');
    }
    if (stored.status === 'paid') throw new HttpsError('already-exists', 'This order is already paid.');
    // Reuse the session while it is open. Stripe forgets idempotency keys after 24 h and
    // sessions expire, so an expired one gets a fresh session keyed on the previous id.
    if (stored.sessionId) {
      const previous = await stripe.checkout.sessions.retrieve(stored.sessionId);
      if (previous.status === 'open') return { url: previous.url };
      if (previous.status === 'complete') throw new HttpsError('already-exists', 'This order is already paid.');
    }
    const origin = new URL(siteUrl.value()).origin;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: order.customer.email,
      line_items: order.items.map((item) => ({
        quantity: item.quantity,
        price_data: { currency: 'usd', unit_amount: item.unitAmount, product_data: { name: `${item.name} — ${item.size}` } },
      })),
      metadata: { orderType: 'bakery', orderId: ref.id, uid: request.auth.uid },
      success_url: `${origin}/orders/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/orders/payment?canceled=1`,
      custom_text: { submit: { message: 'Tampa local orders only. Your requested date and pickup details will be confirmed by SOURAW.' } },
    }, { idempotencyKey: `bakery-${ref.id}-${stored.sessionId || 'first'}` });
    await ref.set({ sessionId: session.id }, { merge: true });
    return { url: session.url };
  } catch (error) {
    if (error instanceof HttpsError) throw error;
    logger.error('Bakery checkout failed', { orderId: ref.id, type: error.type || error.code });
    throw new HttpsError('internal', 'Unable to start payment. Please try again.');
  }
});

exports.getBakeryPayment = onCall(options, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Please refresh and try again.');
  const id = request.data?.sessionId;
  if (typeof id !== 'string' || !/^cs_[a-zA-Z0-9_]{10,200}$/.test(id)) throw new HttpsError('invalid-argument', 'Invalid payment reference.');
  const session = await new Stripe(secret.value()).checkout.sessions.retrieve(id);
  if (session.metadata?.uid !== request.auth.uid || session.metadata?.orderType !== 'bakery') {
    throw new HttpsError('permission-denied', 'Payment not found.');
  }
  return { paid: session.payment_status === 'paid' };
});
