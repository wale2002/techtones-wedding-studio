const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email using Resend (NO SMTP)
 */
const sendEmail = async ({ to, subject, message, html }) => {
  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL, // must be verified domain email
      to,
      subject,
      text: message || "",
      html,
    });

    console.log("✅ Email sent:", response.id);
    return response;
  } catch (err) {
    console.error("❌ Resend email failed:", err.message);
    throw err;
  }
};

module.exports = { sendEmail };
