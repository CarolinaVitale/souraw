const { test } = require('node:test');
const assert = require('node:assert/strict');
process.env.STRIPE_SECRET_KEY = 'sk_test_local_routing_check';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_local_routing_check';
process.env.RESEND_API_KEY = 're_local_routing_check';
const Stripe = require('stripe');
const handler = require('./index').stripeWebhook;

test('signed bakery events bypass digital fulfillment without accessing Firestore or sending email', async () => {
  const payload = JSON.stringify({
    id: 'evt_local_routing', type: 'checkout.session.completed',
    data: { object: { id: 'cs_test_local_routing', metadata: { orderType: 'bakery' } } },
  });
  const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET });
  let code;
  let body;
  const res = {
    status(value) { code = value; return this; },
    json(value) { body = value; return this; },
    send(value) { body = value; return this; },
  };
  await handler({ method: 'POST', headers: { 'stripe-signature': signature }, rawBody: Buffer.from(payload) }, res);
  assert.equal(code, 200);
  assert.equal(body.ignored, 'bakery_order');
});
