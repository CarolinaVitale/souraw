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

Choose JavaScript and Node.js 20, then keep this `functions/index.js` and `functions/package.json`.

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
