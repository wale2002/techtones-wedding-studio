// const Guest = require("../models/Guest.model");
// const Event = require("../models/Event.model");
// const { sendEmail } = require("../services/email.service");
// const { rsvpInviteTemplate } = require("../utils/email.templates"); // ← Import here

// /**
//  * CREATE GUEST
//  */
// const createGuest = async (req, res) => {
//   const { eventId, name, email, phone, address } = req.body;

//   try {
//     const event = await Event.findById(eventId);

//     if (!event) {
//       return res.status(404).json({ msg: "Event not found" });
//     }

//     // Create guest
//     const guest = await Guest.create({
//       event: eventId,
//       name,
//       email,
//       phone,
//       address,
//     });

//     /**
//      * SEND INVITE EMAIL (Non-blocking)
//      */
//     if (email) {
//       try {
//         const rsvpLink = `${process.env.CLIENT_URL}/w/${event.slug}`;

//         const htmlContent = rsvpInviteTemplate({
//           name,
//           eventTitle: event.title,
//           rsvpLink,
//         });

//         await sendEmail({
//           email, // recipient
//           subject: `You're Invited to ${event.title}`, // Removed emoji
//           html: htmlContent, // Use template
//           // message: plain text version (optional but recommended)
//           message: `Hi ${name},\n\nYou’ve been invited to ${event.title}.\n\nPlease RSVP here: ${rsvpLink}`,
//         });

//         console.log(`Invite email sent to ${email}`);
//       } catch (emailErr) {
//         console.error("Failed to send invite email:", emailErr.message);
//         // Do NOT fail the whole request if email fails
//       }
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Guest created successfully",
//       data: guest,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };

// /**
//  * GET GUESTS BY EVENT
//  */
// const getGuestsByEvent = async (req, res) => {
//   try {
//     const guests = await Guest.find({ event: req.params.eventId });
//     return res.json(guests);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };

// /**
//  * UPDATE GUEST
//  */
// const updateGuest = async (req, res) => {
//   const {
//     name,
//     email,
//     phone,
//     address,
//     isAttending,
//     plusOne,
//     dietaryRestrictions,
//     tableNumber,
//   } = req.body;

//   try {
//     let guest = await Guest.findById(req.params.guestId);

//     if (!guest) {
//       return res.status(404).json({ msg: "Guest not found" });
//     }

//     guest.name = name ?? guest.name;
//     guest.email = email ?? guest.email;
//     guest.phone = phone ?? guest.phone;
//     guest.address = address ?? guest.address;
//     guest.isAttending =
//       isAttending !== undefined ? isAttending : guest.isAttending;
//     guest.plusOne = plusOne ?? guest.plusOne;
//     guest.dietaryRestrictions =
//       dietaryRestrictions ?? guest.dietaryRestrictions;
//     guest.tableNumber = tableNumber ?? guest.tableNumber;

//     await guest.save();

//     return res.json(guest);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };

// module.exports = {
//   createGuest,
//   getGuestsByEvent,
//   updateGuest,
// };

const Guest = require("../models/Guest.model");
const Event = require("../models/Event.model");
const { sendEmail } = require("../services/email.service");
const { rsvpInviteTemplate } = require("../utils/email.templates");

/**
 * CREATE GUEST
 */
// const createGuest = async (req, res) => {
//   const { eventId, name, email, phone, address } = req.body;

//   try {
//     const event = await Event.findById(eventId);

//     if (!event) {
//       return res.status(404).json({ msg: "Event not found" });
//     }

//     const guest = await Guest.create({
//       event: eventId,
//       name,
//       email,
//       phone,
//       address,
//     });

//     /**
//      * 📧 SEND INVITE EMAIL (FIXED)
//      */
//     if (email) {
//       try {
//         const rsvpLink = `${process.env.CLIENT_URL}/w/${event.slug}`;

//         const htmlContent = rsvpInviteTemplate({
//           name,
//           eventTitle: event.title,
//           rsvpLink,
//         });

//         await sendEmail({
//           to: email, // ✅ FIXED HERE
//           subject: `You're Invited to ${event.title}`,
//           html: htmlContent,
//           message: `Hi ${name},

// You’ve been invited to ${event.title}.

// Please RSVP here: ${rsvpLink}`,
//         });

//         console.log(`Invite email sent to ${email}`);
//       } catch (emailErr) {
//         console.error("Failed to send invite email:", emailErr.message);
//       }
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Guest created successfully",
//       data: guest,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };

const createGuest = async (req, res) => {
  const { eventId, name, email, phone, address } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const normalizedEmail = email?.toLowerCase();

    /**
     * 🔍 CHECK IF GUEST EXISTS
     */
    let guest = await Guest.findOne({
      event: eventId,
      email: normalizedEmail,
    });

    /**
     * 👤 UPDATE OR CREATE
     */
    if (guest) {
      guest.name = name ?? guest.name;
      guest.phone = phone ?? guest.phone;
      guest.address = address ?? guest.address;

      await guest.save();
    } else {
      guest = await Guest.create({
        event: eventId,
        name,
        email: normalizedEmail,
        phone,
        address,
      });
    }

    /**
     * 📧 SEND INVITE EMAIL (SAFE)
     */
    if (normalizedEmail) {
      try {
        const rsvpLink = `${process.env.CLIENT_URL}/w/${event.slug}`;

        const htmlContent = rsvpInviteTemplate({
          name,
          eventTitle: event.title,
          rsvpLink,
        });

        await sendEmail({
          to: normalizedEmail,
          subject: `You're Invited to ${event.title}`,
          html: htmlContent,
          message: `Hi ${name}, RSVP here: ${rsvpLink}`,
        });
      } catch (emailErr) {
        console.error("Invite email failed:", emailErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: guest
        ? "Guest updated successfully"
        : "Guest created successfully",
      data: guest,
    });
  } catch (err) {
    console.error("createGuest error:", err);

    /**
     * 🧠 SAFE FALLBACK FOR DUPLICATE KEY ERROR
     */
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Guest already exists for this event",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * GET GUESTS BY EVENT
 */
const getGuestsByEvent = async (req, res) => {
  try {
    const guests = await Guest.find({ event: req.params.eventId });
    return res.json(guests);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

/**
 * UPDATE GUEST
 */
const updateGuest = async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    isAttending,
    plusOne,
    dietaryRestrictions,
    tableNumber,
  } = req.body;

  try {
    let guest = await Guest.findById(req.params.guestId);

    if (!guest) {
      return res.status(404).json({ msg: "Guest not found" });
    }

    guest.name = name ?? guest.name;
    guest.email = email ?? guest.email;
    guest.phone = phone ?? guest.phone;
    guest.address = address ?? guest.address;
    guest.isAttending =
      isAttending !== undefined ? isAttending : guest.isAttending;
    guest.plusOne = plusOne ?? guest.plusOne;
    guest.dietaryRestrictions =
      dietaryRestrictions ?? guest.dietaryRestrictions;
    guest.tableNumber = tableNumber ?? guest.tableNumber;

    await guest.save();

    return res.json(guest);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createGuest,
  getGuestsByEvent,
  updateGuest,
};
