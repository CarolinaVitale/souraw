# SOURAW Firebase Functions

This folder receives Stripe `checkout.session.completed` events and sends the SOURAW Wild Start PDF by email through Resend.

## 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

## 2. Add this folder to the project

Put `functions/` at the root of the existing React/Firebase project.

If the project does not already have Firebase Functions initialized, run this from the project root:

```bash
firebase init functions
```

Choose JavaScript and Node.js 22, then keep this `functions/index.js` and `functions/package.json`.

## 3. Install dependencies

```bash
cd functions
npm install
```

## 4. Set production secrets

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
firebase functions:secrets:set RESEND_API_KEY
```

Use:

- `STRIPE_SECRET_KEY`: your Stripe secret key, starting with `sk_live_` or `sk_test_`.
- `STRIPE_WEBHOOK_SECRET`: the webhook signing secret, starting with `whsec_`.
- `RESEND_API_KEY`: your Resend API key.

## 5. Set non-secret parameters

Firebase will prompt for these on first deploy, or you can keep them in `functions/.env` for local emulator use:

```bash
FROM_EMAIL="SOURAW <hello@souraw.com>"
WILD_START_PDF_URL="https://your-private-or-signed-pdf-link"
```

## 6. Deploy

```bash
firebase deploy --only functions:stripeWebhook
```

After deploy, Firebase prints a public HTTPS URL like:

```text
https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/stripeWebhook
```

## 7. Connect Stripe

In Stripe Dashboard:

1. Go to Developers > Webhooks.
2. Add endpoint.
3. Paste the Firebase Function URL.
4. Select `checkout.session.completed`.
5. Copy the signing secret and save it as `STRIPE_WEBHOOK_SECRET`.

## 8. Test

Use Stripe test mode first. Buy through the test Payment Link with a test card, then check:

```bash
firebase functions:log
```

The function writes fulfillment status to Firestore in:

```text
stripeFulfillments/{checkoutSessionId}
```

## Bakery cart payments (bread and sweets)

The React checkout supports Stripe hosted card payments when
`REACT_APP_BAKERY_PAYMENTS_ENABLED=true` is set at build time. Leave it unset
until the backend and webhook have been tested; the existing email order form
continues to work while it is disabled. Never put a Stripe secret in a React env variable.

Configuration in `functions/.env` (non-secret):

```dotenv
BAKERY_SITE_URL=https://souraw.com
BAKERY_ORDERS_EMAIL=your-orders-inbox@example.com
FROM_EMAIL=SOURAW <your-verified-sender@example.com>
```

Create separate Firebase secrets `BAKERY_STRIPE_SECRET_KEY` and
`BAKERY_STRIPE_WEBHOOK_SECRET`; reuse `RESEND_API_KEY` for confirmation emails.
Do not replace the digital-product Stripe secrets. Use Stripe test credentials first and a verified Resend sender.
Enable anonymous authentication in Firebase Authentication (already used by the app).

Deploy `createBakeryCheckout`, `getBakeryPayment` and `bakeryStripeWebhook`:

```bash
firebase deploy --only functions:createBakeryCheckout,functions:getBakeryPayment,functions:bakeryStripeWebhook
```

The separate `bakeryStripeWebhook` endpoint must receive `checkout.session.completed` from the same
Stripe account/mode as the checkout key. Card payments are enabled explicitly;
additional payment methods are not yet configured.

Orders are stored in `bakeryOrders/{uid_requestId}` before checkout and marked
`paid` only after a signed webhook verifies the payment total, currency and order.
Confirmation emails are sent through Resend with stable idempotency keys.
Failures return HTTP 500 so Stripe can retry; do not disable webhook retries.
The return page independently verifies payment with Stripe; it does not fulfill orders.
Client access to `bakeryOrders` must be denied in your deployed Firestore rules.
Review existing broad rules: a more general allow rule overrides a narrower deny.
Only the Firebase Admin SDK in Functions needs access to this collection.

Before enabling the frontend flag:

1. Set `BAKERY_SITE_URL` to the real frontend origin (localhost is also supported for testing).
2. Confirm `BAKERY_ORDERS_EMAIL` and the sender are configured.
3. Test a successful Stripe test payment, a declined card, and cancellation.
4. Verify the paid record, both emails, and successful return-page verification.
5. Replay the same signed webhook and verify there are no duplicate emails/orders.
6. Confirm the cart survives cancellation and stays available after payment errors.
7. Confirm production Firestore rules prevent browser reads/writes of bakeryOrders.
8. Confirm the existing prices and local pickup/date arrangements are correct.

This flow charges published product prices in USD. It adds no shipping fees or
automatic taxes. Customers request a date; SOURAW confirms the date and pickup
separately. Products requiring a quote remain contact-only. Update
`functions/bakery.js` whenever menu prices or variants change; the catalog parity
test checks featured products against `src/data/products.js`.

Run backend validation tests with `node --test functions/bakery.test.js`.
After test purchases pass, configure live secrets/webhook, enable the frontend flag,
rebuild and publish the frontend. No deployment is performed by editing these files.

Stripe references: [Create a Checkout Session](https://docs.stripe.com/api/checkout/sessions/create)
and [Fulfill orders](https://docs.stripe.com/checkout/fulfillment).


## Production rollout

Use an actual Stripe API secret (starting with `sk_live_`, or an appropriately
permissioned `rk_live_`). An API key ID starting with `mk_` cannot authenticate
Stripe requests. Never paste secret values into source files, a chat, or frontend
variables. Store the bakery secret in Firebase Secret Manager as
`BAKERY_STRIPE_SECRET_KEY`.

The live webhook must use the live account and point at:
`https://us-central1-souraw-7eded.cloudfunctions.net/bakeryStripeWebhook`.
Store its signing secret as `BAKERY_STRIPE_WEBHOOK_SECRET`. Test and live signing
secrets differ even if both webhook endpoints use the same URL.

Set `BAKERY_SITE_URL=https://souraw.com` before redeploying the bakery functions.
Only deploy the bakery functions for this rollout:

```bash
firebase deploy --only functions:createBakeryCheckout,functions:getBakeryPayment,functions:bakeryStripeWebhook --project souraw-7eded
```

The frontend release requires `REACT_APP_BAKERY_PAYMENTS_ENABLED=true` at build
time. `.env.production.local` holds this flag locally and is ignored by Git.
Build with `npm run build`; include the root `.htaccess` in the upload so direct
payment-return URLs are routed to React. The Bluehost ZIP contains public build
files only, with `index.html`, `.htaccess`, and `static/` at its root. Keep a backup
of the currently published files and preserve unrelated verification files.
Do not upload the prepared release until the live backend is confirmed ready.


### Production rollout status — 2026-10-28

The three bakery functions are deployed with Node.js 22, production secret
versions 2, and `BAKERY_SITE_URL=https://souraw.com`. The enabled live webhook
`we_1UVfl7AoYuJctapueHfTOO58` handles `checkout.session.completed`.
A real $8 checkout session was created through the authenticated callable,
verified as unpaid, and expired without a charge. A signed diagnostic event
confirmed the production webhook accepts its signing secret and ignores
non-bakery metadata. Five backend and three payment-page tests pass.

The prepared Bluehost ZIP still needs to be uploaded before the public website
uses this checkout. A paid live order and real webhook delivery have not been
performed; the earlier paid test-mode order verified fulfillment and emails.
