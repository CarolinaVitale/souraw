const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret, defineString } = require("firebase-functions/params");
const { Resend } = require("resend");
const Stripe = require("stripe");

admin.initializeApp();

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");
const resendApiKey = defineSecret("RESEND_API_KEY");

const fromEmail = defineString("FROM_EMAIL", {
  default: "SOURAW <onboarding@resend.dev>",
});

const guideDownloadUrl = defineString("GUIDE_DOWNLOAD_URL", {
  default: "https://souraw.com",
});

const wildStartPaymentLinkId = defineString("WILD_START_PAYMENT_LINK_ID", {
  default: "",
});

const dehydratedStarterPaymentLinkId = defineString("DEHYDRATED_STARTER_PAYMENT_LINK_ID", {
  default: "",
});

exports.stripeWebhook = onRequest(
  {
    region: "us-central1",
    secrets: [stripeSecretKey, stripeWebhookSecret, resendApiKey],
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const stripe = new Stripe(stripeSecretKey.value());
    const resend = new Resend(resendApiKey.value());

    const signature = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        stripeWebhookSecret.value()
      );
    } catch (error) {
      logger.error("Stripe signature verification failed", error);
      res.status(400).send("Invalid Stripe signature");
      return;
    }

    if (event.type !== "checkout.session.completed") {
      res.status(200).json({ received: true, ignored: true });
      return;
    }

    const session = event.data.object;
    const sessionId = session.id;
    const paymentLinkId =
      typeof session.payment_link === "string"
        ? session.payment_link
        : session.payment_link?.id;

    const customerEmail =
      session.customer_details?.email || session.customer_email;

    const customerName =
      session.customer_details?.name?.split(" ")[0] || "friend";

    if (session.payment_status !== "paid") {
      logger.warn("Checkout session completed but payment is not paid", {
        sessionId,
        paymentStatus: session.payment_status,
      });

      res.status(200).json({ received: true, ignored: "payment_not_paid" });
      return;
    }

    if (!customerEmail) {
      logger.error("No customer email found", { sessionId });
      res.status(500).send("Missing customer email");
      return;
    }

    const fulfillmentRef = admin
      .firestore()
      .collection("stripeFulfillments")
      .doc(sessionId);

    const existingFulfillment = await fulfillmentRef.get();

    if (existingFulfillment.exists && existingFulfillment.data()?.status === "sent") {
      res.status(200).json({ received: true, duplicate: true });
      return;
    }

    const isWildStart = paymentLinkId === wildStartPaymentLinkId.value();
    const isDehydratedStarter =
      paymentLinkId === dehydratedStarterPaymentLinkId.value();

    if (!isWildStart && !isDehydratedStarter) {
      logger.warn("Unknown payment link. No email sent.", {
        sessionId,
        paymentLinkId,
      });

      await fulfillmentRef.set(
        {
          status: "ignored_unknown_product",
          paymentLinkId,
          customerEmail,
          customerName,
          stripeEventId: event.id,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      res.status(200).json({
        received: true,
        ignored: "unknown_payment_link",
        paymentLinkId,
      });
      return;
    }

    await fulfillmentRef.set(
      {
        status: "processing",
        productType: isWildStart ? "wild_start" : "dehydrated_starter",
        paymentLinkId,
        customerEmail,
        customerName,
        customerDetails: session.customer_details || null,
        stripeEventId: event.id,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    try {
      let emailPayload;

      if (isWildStart) {
        const pdfPath = path.join(__dirname, "assets", "souraw-wild-start.pdf");
        const pdfContent = fs.readFileSync(pdfPath);

        emailPayload = {
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
        };
      }

      if (isDehydratedStarter) {
        emailPayload = {
          from: fromEmail.value(),
          to: customerEmail,
          subject: "Your dehydrated sourdough starter is being prepared ♡",
          html: buildDehydratedStarterEmail({ customerName }),
        };
      }

      const emailResult = await resend.emails.send(emailPayload);

      if (emailResult.error) {
        throw new Error(emailResult.error.message);
      }

      await fulfillmentRef.set(
        {
          status: "sent",
          resendEmailId: emailResult.data?.id || null,
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      res.status(200).json({
        received: true,
        delivered: true,
        productType: isWildStart ? "wild_start" : "dehydrated_starter",
      });
    } catch (error) {
      logger.error("Email delivery failed", error);

      await fulfillmentRef.set(
        {
          status: "failed",
          errorMessage: error.message,
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      res.status(500).send("Email delivery failed");
    }
  }
);

function buildWildStartEmail({ customerName, guideUrl }) {
  return `
    <div style="margin:0;padding:0;background:#ffe8cf;">
      <div style="max-width:700px;margin:0 auto;padding:30px 20px;font-family:'Montserrat',Arial,sans-serif;color:#363636;">
        <div style="text-align:center;margin-bottom:34px;">
          <img src="https://firebasestorage.googleapis.com/v0/b/souraw-7eded.firebasestorage.app/o/logo-header.png?alt=media&token=7ca8428a-bdbb-41a1-ad39-ec7fc92e8cd6" alt="SOURAW" style="width:180px;max-width:100%;display:block;margin:0 auto 18px;" />
          <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:800;">untamed &bull; unrushed &bull; unapologetic</p>
        </div>

        <img src="https://firebasestorage.googleapis.com/v0/b/souraw-7eded.firebasestorage.app/o/fermentina-square.webp?alt=media&token=affe6ada-6676-4b9a-bae1-823e43fd9961" alt="SOURAW Wild Start" style="width:100%;display:block;margin:0 auto 36px;" />

        <h1 style="margin:0 0 28px;font-size:50px;line-height:.95;text-transform:uppercase;font-weight:900;color:#363636;">
          Your Wild Start<br />is here &#9825;
        </h1>

        <p style="font-size:18px;line-height:1.8;margin:0 0 20px;">Hi ${escapeHtml(customerName)},</p>
        <p style="font-size:18px;line-height:1.8;margin:0 0 20px;">Thank you for joining <strong>Unrushed Lab</strong>.</p>
        <p style="font-size:18px;line-height:1.8;margin:0 0 20px;">Your <strong>SOURAW Wild Start</strong> guide is attached to this email and ready whenever you are.</p>
        <p style="font-size:18px;line-height:1.8;margin:0 0 38px;">Inside you'll learn the method I use to build a strong, active starter without wasting flour.</p>

        <div style="text-align:center;margin:0 0 46px;">
          <a href="${escapeHtml(guideUrl)}" style="display:inline-block;background:#363636;color:#ffe8cf;text-decoration:none;padding:18px 34px;border-radius:999px;font-size:13px;font-weight:900;letter-spacing:2px;text-transform:uppercase;">
            Download Your Guide
          </a>
        </div>

        <div style="background:#fff7ef;padding:30px;margin-bottom:40px;">
          <p style="margin:0 0 15px;font-size:20px;font-weight:900;">Start slow. Watch closely. Trust the process.</p>
          <p style="margin:0;font-size:17px;line-height:1.8;">No complicated schedules.<br />No daily flour waste.<br />No rushing.</p>
        </div>

        <p style="font-size:18px;line-height:1.8;margin:0 0 8px;">Happy baking,</p>
        <p style="font-size:24px;font-weight:900;margin:0 0 56px;">Carola &#9825;</p>

        <div style="text-align:center;border-top:1px solid rgba(54,54,54,.15);padding-top:28px;">
          <p style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:900;">SOURAW</p>
          <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;">untamed &bull; unrushed &bull; unapologetic</p>
        </div>
      </div>
    </div>
  `;
}

function buildDehydratedStarterEmail({ customerName }) {
  return `
    <div style="margin:0;padding:0;background:#ffe8cf;">
      <div style="max-width:700px;margin:0 auto;padding:30px 20px;font-family:'Montserrat',Arial,sans-serif;color:#363636;">
        <div style="text-align:center;margin-bottom:34px;">
          <img src="https://firebasestorage.googleapis.com/v0/b/souraw-7eded.firebasestorage.app/o/logo-header.png?alt=media&token=7ca8428a-bdbb-41a1-ad39-ec7fc92e8cd6" alt="SOURAW" style="width:180px;max-width:100%;display:block;margin:0 auto 18px;" />
          <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:800;">untamed &bull; unrushed &bull; unapologetic</p>
        </div>

        <h1 style="margin:0 0 28px;font-size:48px;line-height:.95;text-transform:uppercase;font-weight:900;color:#363636;">
          Your dehydrated<br />sourdough starter<br />is being prepared &#9825;
        </h1>

        <p style="font-size:18px;line-height:1.8;margin:0 0 20px;">
          Hi ${escapeHtml(customerName)},
        </p>

        <p style="font-size:18px;line-height:1.8;margin:0 0 20px;">
          Thank you for ordering a <strong>SOURAW dehydrated sourdough starter</strong>.
        </p>

        <p style="font-size:18px;line-height:1.8;margin:0 0 20px;">
          I'm carefully preparing your package so everything is ready for its journey.
        </p>

        <p style="font-size:18px;line-height:1.8;margin:0 0 20px;">
          As soon as it's on its way, you'll receive another email with your shipping confirmation and tracking details.
        </p>

        <p style="font-size:18px;line-height:1.8;margin:0 0 38px;">
          When it arrives, you'll find a QR code inside the package with simple step-by-step instructions to help you bring your starter back to life.
        </p>

        <div style="background:#fff7ef;padding:30px;margin-bottom:40px;">
          <p style="margin:0 0 15px;font-size:20px;font-weight:900;">
            A tiny beginning. A living process.
          </p>
          <p style="margin:0;font-size:17px;line-height:1.8;">
            No rush.<br />
            No pressure.<br />
            Just flour, water, time, and attention.
          </p>
        </div>

        <p style="font-size:18px;line-height:1.8;margin:0 0 8px;">
          See you very soon,
        </p>

        <p style="font-size:24px;font-weight:900;margin:0 0 56px;">
          Carola &#9825;
        </p>

        <div style="text-align:center;border-top:1px solid rgba(54,54,54,.15);padding-top:28px;">
          <p style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:900;">SOURAW</p>
          <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;">untamed &bull; unrushed &bull; unapologetic</p>
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