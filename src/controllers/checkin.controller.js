// const Rsvp = require("../models/Rsvp.model");

// /**
//  * 📥 GET CHECK-IN DATA (Called when QR is scanned)
//  */
// const getCheckinData = async (req, res) => {
//   try {
//     const rsvp = await Rsvp.findById(req.params.id)
//       .populate("guest", "plusOne group notes")
//       .populate("event", "title");

//     if (!rsvp) {
//       return res.status(404).json({
//         success: false,
//         message: "Invalid QR Code or RSVP not found",
//       });
//     }

//     if (rsvp.status !== "approved") {
//       return res.status(400).json({
//         success: false,
//         message: "RSVP has not been approved yet",
//       });
//     }

//     return res.json({
//       success: true,
//       data: {
//         rsvpId: rsvp._id,
//         name: rsvp.name,
//         email: rsvp.email,
//         attending: rsvp.attending,
//         // Use plusOne from linked Guest if available, otherwise fallback
//         totalGuests: rsvp.guest?.plusOne ? rsvp.guest.plusOne + 1 : 1,
//         message: rsvp.message,
//         checkedIn: rsvp.checkedIn || false,
//         checkedInAt: rsvp.checkedInAt,
//         eventTitle: rsvp.event?.title,
//       },
//     });
//   } catch (err) {
//     console.error("getCheckinData error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// /**
//  * ✅ CHECK-IN GUEST (Staff scans QR and confirms check-in)
//  */
// const checkInGuest = async (req, res) => {
//   try {
//     const rsvp = await Rsvp.findById(req.params.id);

//     if (!rsvp) {
//       return res.status(404).json({
//         success: false,
//         message: "RSVP not found",
//       });
//     }

//     if (rsvp.status !== "approved") {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot check-in: RSVP is not approved",
//       });
//     }

//     if (rsvp.checkedIn) {
//       return res.status(400).json({
//         success: false,
//         message: "Guest already checked in",
//       });
//     }

//     rsvp.checkedIn = true;
//     rsvp.checkedInAt = new Date();
//     await rsvp.save();

//     return res.json({
//       success: true,
//       message: `✅ ${rsvp.name} has been successfully checked in`,
//       data: {
//         rsvpId: rsvp._id,
//         name: rsvp.name,
//         checkedInAt: rsvp.checkedInAt,
//       },
//     });
//   } catch (err) {
//     console.error("checkInGuest error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// module.exports = {
//   getCheckinData,
//   checkInGuest,
// };

const Rsvp = require("../models/Rsvp.model");
const checkinPageTemplate = require("../utils/checkin.template");

/**
 * 📥 GET CHECK-IN DATA (QR Code lands here)
 * This is what the scanner / check-in page calls
 */
const getCheckinData = async (req, res) => {
  try {
    const rsvp = await Rsvp.findById(req.params.id).populate("event", "title");

    if (!rsvp) {
      return res.status(404).send("<h2>RSVP not found</h2>");
    }

    const html = checkinPageTemplate({
      name: rsvp.name,
      email: rsvp.email,
      attending: rsvp.attending,
      totalGuests: rsvp.totalGuests || 1,
      guestGroup: rsvp.group || null,
      notes: rsvp.notes || null,
      checkedIn: rsvp.checkedIn,
      eventTitle: rsvp.event?.title || "Wedding",
    });

    res.setHeader("Content-Type", "text/html");
    return res.send(html);
  } catch (err) {
    return res.status(500).send("<h2>Server error</h2>");
  }
};

/**
 * ✅ PERFORM CHECK-IN (Staff action)
 */
const checkInGuest = async (req, res) => {
  try {
    const rsvp = await Rsvp.findById(req.params.id);

    if (!rsvp) {
      return res.status(404).json({
        success: false,
        message: "RSVP not found",
      });
    }

    if (rsvp.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Cannot check in: RSVP is not approved",
      });
    }

    if (rsvp.checkedIn) {
      return res.status(400).json({
        success: false,
        message: "Guest is already checked in",
      });
    }

    rsvp.checkedIn = true;
    rsvp.checkedInAt = new Date();
    await rsvp.save();

    return res.json({
      success: true,
      message: `✅ ${rsvp.name} checked in successfully`,
      data: {
        rsvpId: rsvp._id,
        name: rsvp.name,
        checkedInAt: rsvp.checkedInAt,
      },
    });
  } catch (err) {
    console.error("checkInGuest error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getCheckinData,
  checkInGuest,
};
