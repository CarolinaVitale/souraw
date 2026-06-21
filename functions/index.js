const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret, defineString } = require("firebase-functions/params");
const { Resend } = require("resend");
const Stripe = require("stripe");

admin.initializeApp();

const db = admin.firestore();

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");
const resendApiKey = defineSecret("RESEND_API_KEY");

const fromEmail = defineString("FROM_EMAIL", {
    default: "SOURAW <onboarding@resend.dev>",
});

const guideDownloadUrl = defineString("GUIDE_DOWNLOAD_URL", {
    default: "https://souraw.com",
});

exports.stripeWebhook = onRequest(
    {
        region: "us-central1",
        cors: false,
        timeoutSeconds: 60,
        secrets: [stripeSecretKey, stripeWebhookSecret, resendApiKey],
    },
    async (req, res) => {
        if (req.method !== "POST") {
            res.set("Allow", "POST");
            res.status(405).send("Method Not Allowed");
            return;
        }

        const signature = req.headers["stripe-signature"];
        const stripe = new Stripe(stripeSecretKey.value());

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                signature,
                stripeWebhookSecret.value(),
            );
        } catch (error) {
            logger.warn("Stripe webhook signature verification failed", {
                message: error.message,
            });
            res.status(400).send(`Webhook Error: ${error.message}`);
            return;
        }

        if (event.type !== "checkout.session.completed") {
            logger.info("Ignoring Stripe event", { type: event.type });
            res.status(200).json({ received: true, ignored: true });
            return;
        }

        const session = event.data.object;
        const sessionId = session.id;
        const customerEmail = session.customer_details?.email || session.customer_email;
        const customerName = session.customer_details?.name || "there";

        if (session.payment_status !== "paid") {
            logger.info("Checkout session completed but payment is not paid yet", {
                sessionId,
                paymentStatus: session.payment_status,
            });
            res.status(200).json({ received: true, pendingPayment: true });
            return;
        }

        const fulfillmentRef = db.collection("stripeFulfillments").doc(sessionId);
        const existingFulfillment = await fulfillmentRef.get();

        if (existingFulfillment.exists && existingFulfillment.data()?.status === "sent") {
            logger.info("Skipping duplicate fulfillment", { sessionId });
            res.status(200).json({ received: true, duplicate: true });
            return;
        }

        if (!customerEmail) {
            await fulfillmentRef.set(
                {
                    status: "missing_email",
                    eventId: event.id,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true },
            );

            logger.error("Checkout session has no customer email", { sessionId });
            res.status(200).json({ received: true, missingEmail: true });
            return;
        }

        const resend = new Resend(resendApiKey.value());

        try {
            const pdfPath = path.join(__dirname, "assets", "souraw-wild-start.pdf");
            const pdfContent = fs.readFileSync(pdfPath);

            const emailResult = await resend.emails.send({
                from: fromEmail.value(),
                to: customerEmail,
                subject: "Welcome to Unrushed Lab ♡",
                html: buildWildStartEmail({
                    customerName,
                    guideUrl: guideDownloadUrl.value(),
                }),
                attachments: [
                    {
                        filename: "souraw-wild-start.pdf",
                        content: pdfContent,
                    },
                ],
            });

            if (emailResult.error) {
                throw new Error(emailResult.error.message);
            }

            await fulfillmentRef.set(
                {
                    status: "sent",
                    eventId: event.id,
                    customerEmail,
                    amountTotal: session.amount_total,
                    currency: session.currency,
                    paymentStatus: session.payment_status,
                    resendEmailId: emailResult.data?.id || null,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true },
            );

            logger.info("SOURAW Wild Start delivered", {
                sessionId,
                customerEmail,
                emailId: emailResult.data?.id,
            });

            res.status(200).json({ received: true, delivered: true });
        } catch (error) {
            await fulfillmentRef.set(
                {
                    status: "failed",
                    eventId: event.id,
                    customerEmail,
                    error: error.message,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true },
            );

            logger.error("Failed to deliver SOURAW Wild Start", {
                sessionId,
                customerEmail,
                message: error.message,
            });

            res.status(500).send("Email delivery failed");
        }
    },
);

function buildWildStartEmail({ customerName, guideUrl }) {
    return `
    <div style="margin:0;padding:0;background:#ffe8cf;">

      <div style="max-width:700px;margin:0 auto;padding:0 20px 34px;font-family:'Montserrat',Arial,sans-serif;color:#363636;">

        <div style="text-align:center;padding:34px 0 24px;">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/souraw-7eded.firebasestorage.app/o/logo-header.png?alt=media&token=7ca8428a-bdbb-41a1-ad39-ec7fc92e8cd6"
            alt="SOURAW"
            style="width:180px;max-width:100%;display:block;margin:0 auto 16px;"
          />

          <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:800;">
            untamed &bull; unrushed &bull; unapologetic
          </p>
        </div>

        <div style="text-align:center;margin-bottom:22px;letter-spacing:3px;">
          <span style="display:inline-block;background:#f6bc3f;padding:8px 14px;border-radius:999px;font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;">
            Unrushed Lab
          </span>
        </div>

        <h1 style="margin:0 0 34px;font-size:50px;line-height:0.94;letter-spacing:2px;text-transform:uppercase;font-weight:1200;text-align:center;">
          Your Wild Start<br />
          is here &#9825;
        </h1>

        <p style="font-size:18px;line-height:1.8;margin:0 0 20px;letter-spacing:1px;">
          Hi ${escapeHtml(customerName)},
        </p>

        <p style="font-size:18px;line-height:1.8;margin:0 0 20px;letter-spacing:1px;">
          Thank you for joining <strong>Unrushed Lab</strong>.
        </p>

        <p style="font-size:18px;line-height:1.8;margin:0 0 20px;letter-spacing:1px;">
          Your <strong>SOURAW Wild Start</strong> guide is attached to this email and ready whenever you are.
        </p>

        <p style="font-size:18px;line-height:1.8;margin:0 0 38px;letter-spacing:1px;">
          You can open it instantly using the button below, or keep this email saved and come back whenever you're ready to start.
        </p>

        <div style="text-align:center;margin:0 0 48px;">
          <a
            href="${escapeHtml(guideUrl)}"
            style="display:inline-block;background:#363636;color:#ffe8cf;text-decoration:none;padding:18px 34px;border-radius:999px;font-size:13px;font-weight:900;letter-spacing:2px;text-transform:uppercase;"
          >
            Open Your Guide &#9825;
          </a>
        </div>

        <div style="background:#fff7ef;padding:30px;margin-bottom:40px;">
          <p style="margin:0 0 15px;font-size:20px;font-weight:900;letter-spacing:1px;">
            Start slow. Watch closely. Trust the process.
          </p>

          <p style="margin:0;font-size:17px;line-height:1.8;letter-spacing:1px;">
            No complicated schedules.<br />
            No daily flour waste.<br />
            No rushing.
          </p>
        </div>

        <p style="font-size:17px;line-height:1.9;margin:0 0 20px;letter-spacing:1px;">
          Sourdough isn't about controlling every step.
        </p>

        <p style="font-size:17px;line-height:1.9;margin:0 0 20px;letter-spacing:1px;">
          It's about learning to notice small changes, understanding timing, and trusting what your starter is telling you.
        </p>

        <p style="font-size:17px;line-height:1.9;margin:0 0 50px;letter-spacing:1px;">
          Take your time with it.
        </p>

        <div style="background:#008b46;color:#ffe8cf;padding:24px;margin-bottom:50px;">
          <p style="margin:0;font-size:15px;line-height:1.8;font-weight:800;letter-spacing:1px;">
            Save this email somewhere safe so you can always come back to your guide.
          </p>
        </div>

        <p style="margin:0 0 8px;font-size:18px;letter-spacing:1px;text-transform:uppercase">
          Happy baking,
        </p>

        <p style="margin:0 0 60px;font-size:24px;font-weight:900;letter-spacing:1px;text-transform:uppercase">
          Carola &#9825;
        </p>

        <div style="text-align:center;border-top:1px solid rgba(54,54,54,.15);padding-top:28px;">
          <p style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:900;">
            Slow bread. Loud impact.
          </p>

          <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;">
            untamed &bull; unrushed &bull; unapologetic
          </p>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}