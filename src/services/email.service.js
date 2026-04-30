// // // const nodemailer = require("nodemailer");

// // // const sendEmail = async ({ email, subject, message, html }) => {
// // //   const transporter = nodemailer.createTransport({
// // //     host: process.env.SMTP_HOST,
// // //     port: Number(process.env.SMTP_PORT),
// // //     secure: true,
// // //     auth: {
// // //       user: process.env.SMTP_USER,
// // //       pass: process.env.SMTP_PASS,
// // //     },
// // //   });

// // //   await transporter.sendMail({
// // //     from: process.env.FROM_EMAIL,
// // //     to: email,
// // //     subject,
// // //     text: message,
// // //     html,
// // //   });
// // // };

// // // module.exports = { sendEmail };

// // const nodemailer = require("nodemailer");

// // // Create transporter ONCE (important performance fix)
// // const transporter = nodemailer.createTransport({
// //   host: process.env.SMTP_HOST,
// //   port: Number(process.env.SMTP_PORT),
// //   secure: Number(process.env.SMTP_PORT) === 465, // auto-handle SSL vs TLS
// //   auth: {
// //     user: process.env.SMTP_USER,
// //     pass: process.env.SMTP_PASS,
// //   },
// // });

// // /**
// //  * Send email (standardized API)
// //  */
// // const sendEmail = async ({ to, subject, message, html }) => {
// //   try {
// //     return await transporter.sendMail({
// //       from: process.env.FROM_EMAIL,
// //       to,
// //       subject,
// //       text: message,
// //       html,
// //     });
// //   } catch (err) {
// //     console.error("Email send failed:", err.message);
// //     throw err;
// //   }
// // };

// // module.exports = { sendEmail };

// const nodemailer = require("nodemailer");

// // Create transporter with better settings for cloud hosting
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT) || 587, // Default to 587 if not set
//   secure: Number(process.env.SMTP_PORT) === 465,
//   requireTLS: true, // Important for port 587
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
//   // Increase timeouts to reduce false timeouts
//   connectionTimeout: 15000,
//   greetingTimeout: 15000,
//   socketTimeout: 30000,
// });

// // Optional: Test transporter on startup (helpful for debugging)
// transporter.verify((error) => {
//   if (error) {
//     console.error("❌ Email transporter verification failed:", error.message);
//   } else {
//     console.log("✅ Email transporter is ready to send emails");
//   }
// });

// /**
//  * Send email (standardized API)
//  */
// const sendEmail = async ({ to, subject, message, html }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.FROM_EMAIL,
//       to,
//       subject,
//       text: message || "",
//       html,
//     });

//     console.log(`✅ Email sent successfully: ${info.messageId}`);
//     return info;
//   } catch (err) {
//     console.error("Email send failed:", err.message);
//     throw err;
//   }
// };

// module.exports = { sendEmail };

const nodemailer = require("nodemailer");

/**
 * Create transporter (safe for cloud hosting like Render)
 */
const port = Number(process.env.SMTP_PORT || 587);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465, // SSL only for 465
  requireTLS: port === 587, // TLS for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  // 🔥 Prevent false timeouts on cloud hosts
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
});

/**
 * Optional transporter verification (DEV ONLY)
 * ⚠️ Disabled in production to avoid Render startup delays
 */
if (process.env.NODE_ENV === "development") {
  transporter.verify((error) => {
    if (error) {
      console.error("❌ Email transporter verification failed:", error.message);
    } else {
      console.log("✅ Email transporter is ready to send emails");
    }
  });
}

/**
 * Send email (main function)
 */
const sendEmail = async ({ to, subject, message, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      text: message || "",
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email send failed:", err.message);

    // Re-throw so controller can handle properly
    throw err;
  }
};

module.exports = { sendEmail };
