// const { getEventBySlug } = require("../services/event.service");
// const { processRsvp } = require("../services/rsvp.service");
// const { sendResponse } = require("../utils/response.utils");
// const Rsvp = require("../models/Rsvp.model");
// const { sendEmail } = require("../services/email.service");
// const { addJob } = require("../jobs/email.queue");
// const { rsvpConfirmationTemplate } = require("../utils/email.templates");

// const submitRsvp = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const event = await getEventBySlug(slug);

//     if (!event) {
//       return sendResponse(res, 404, false, "Wedding not found");
//     }

//     const rsvp = await processRsvp(event, req.body);

//     /**
//      * SEND CONFIRMATION EMAIL
//      */
//     if (rsvp.email) {
//       try {
//         const htmlContent = rsvpConfirmationTemplate({
//           name: rsvp.name,
//           eventTitle: event.title,
//         });

//         await sendEmail({
//           to: rsvp.email, // ✅ FIXED: was "email", now "to"
//           subject: `RSVP Received - ${event.title}`,
//           html: htmlContent,
//           message: `Hi ${rsvp.name}, your RSVP has been received for ${event.title}`,
//         });

//         console.log(`Confirmation email sent to ${rsvp.email}`);
//       } catch (emailErr) {
//         console.error("Failed to send RSVP confirmation:", emailErr.message);
//       }
//     }

//     return sendResponse(res, 201, true, "RSVP submitted successfully", rsvp);
//   } catch (err) {
//     next(err);
//   }
// };

// const approveRsvp = async (req, res) => {
//   try {
//     const rsvp = await Rsvp.findById(req.params.id);

//     if (!rsvp) {
//       return res.status(404).json({ msg: "RSVP not found" });
//     }

//     // Update status
//     rsvp.status = "approved";
//     await rsvp.save();

//     // Send email ONLY if email exists
//     if (rsvp.email) {
//       addJob(async () => {
//         await sendEmail({
//           to: rsvp.email, // ✅ FIXED (standardized)
//           subject: "🎉 RSVP Confirmed - You're Invited!",
//           html: require("../utils/rsvp.Approved.template")(rsvp),
//         });
//       });
//     }

//     return res.json({
//       success: true,
//       message: "RSVP approved and email queued successfully",
//       data: rsvp,
//     });
//   } catch (err) {
//     console.error("approveRsvp error:", err);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };

// module.exports = {
//   submitRsvp,
//   approveRsvp,
// };

const { getEventBySlug } = require("../services/event.service");
const { processRsvp } = require("../services/rsvp.service");
const { sendResponse } = require("../utils/response.utils");
const Rsvp = require("../models/Rsvp.model");
const { generateAndUploadQR } = require("../services/qr.service");
const { sendEmail } = require("../services/email.service");
const Event = require("../models/Event.model"); // ← ADD THIS LINE
const { addJob } = require("../jobs/email.queue");
const { rsvpConfirmationTemplate } = require("../utils/email.templates");
const rsvpApprovedTemplate = require("../utils/rsvp.Approved.template");
const QRCode = require("qrcode");

/**
 * 🟡 RSVP SUBMISSION (PENDING STATE)
 */
const submitRsvp = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const event = await getEventBySlug(slug);

    if (!event) {
      return sendResponse(res, 404, false, "Wedding not found");
    }

    const rsvp = await processRsvp(event, req.body);

    /**
     * 📧 SEND CONFIRMATION EMAIL (NO QR HERE)
     */
    if (rsvp.email) {
      addJob(async () => {
        await sendEmail({
          to: rsvp.email,
          subject: `RSVP Received - ${event.title}`,
          html: rsvpConfirmationTemplate({
            name: rsvp.name,
            eventTitle: event.title,
          }),
        });
      });
    }

    return sendResponse(res, 201, true, "RSVP submitted successfully", rsvp);
  } catch (err) {
    next(err);
  }
};

/**
 * 🟢 APPROVE RSVP (TICKET ISSUED)
 */
/**
 * 🟢 APPROVE RSVP (TICKET ISSUED WITH QR)
 */
const approveRsvp = async (req, res) => {
  try {
    const rsvp = await Rsvp.findById(req.params.id);

    if (!rsvp) {
      return res.status(404).json({ msg: "RSVP not found" });
    }

    if (rsvp.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "RSVP already approved",
      });
    }

    rsvp.status = "approved";

    // Generate check-in URL
    const checkinUrl = `http://localhost:5000/api/checkin/${rsvp._id}`;

    // Get event slug for Cloudinary folder
    let eventSlug = "default";
    if (rsvp.event) {
      const event = await Event.findById(rsvp.event);
      if (event && event.slug) {
        eventSlug = event.slug;
      }
    }

    // Generate + upload QR to Cloudinary
    const qrPublicUrl = await generateAndUploadQR(checkinUrl, eventSlug);

    rsvp.qrCode = qrPublicUrl;
    await rsvp.save();

    // Send approval email with QR
    if (rsvp.email) {
      addJob(async () => {
        try {
          await sendEmail({
            to: rsvp.email,
            subject: "🎉 RSVP Approved - Your Entry Pass",
            html: rsvpApprovedTemplate(rsvp, qrPublicUrl, checkinUrl), // pass checkinUrl for fallback
          });
          console.log(`Approval email with QR sent to ${rsvp.email}`);
        } catch (emailErr) {
          console.error("Failed to send approval email:", emailErr.message);
        }
      });
    }

    return res.json({
      success: true,
      message: "RSVP approved and ticket sent",
      data: rsvp,
    });
  } catch (err) {
    console.error("approveRsvp error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
// const approveRsvp = async (req, res) => {
//   try {
//     const rsvp = await Rsvp.findById(req.params.id);

//     if (!rsvp) {
//       return res.status(404).json({ msg: "RSVP not found" });
//     }

//     /**
//      * 🚫 Prevent double approval
//      */
//     if (rsvp.status === "approved") {
//       return res.status(400).json({
//         success: false,
//         message: "RSVP already approved",
//       });
//     }

//     // ✅ STEP 1: Update status
//     rsvp.status = "approved";

//     // 🎟 STEP 2: Generate QR code (check-in link)
//     const checkinUrl = `${process.env.FRONTEND_URL}/checkin/${rsvp._id}`;
//     const qrCodeImage = await QRCode.toDataURL(checkinUrl);

//     rsvp.qrCode = qrCodeImage;

//     await rsvp.save();

//     /**
//      * 📧 STEP 3: SEND APPROVAL EMAIL (WITH QR)
//      */
//     if (rsvp.email) {
//       addJob(async () => {
//         await sendEmail({
//           to: rsvp.email,
//           subject: "🎉 RSVP Approved - Your Entry Pass",
//           html: rsvpApprovedTemplate(rsvp, qrCodeImage),
//         });
//       });
//     }

//     return res.json({
//       success: true,
//       message: "RSVP approved and ticket sent",
//       data: rsvp,
//     });
//   } catch (err) {
//     console.error("approveRsvp error:", err);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };

module.exports = {
  submitRsvp,
  approveRsvp,
};
