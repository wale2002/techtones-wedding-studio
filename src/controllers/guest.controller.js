// // // const Guest = require("../models/Guest.model");
// // // const Event = require("../models/Event.model");
// // // const { sendEmail } = require("../services/email.service");
// // // const { rsvpInviteTemplate } = require("../utils/email.templates"); // ← Import here

// // // /**
// // //  * CREATE GUEST
// // //  */
// // // const createGuest = async (req, res) => {
// // //   const { eventId, name, email, phone, address } = req.body;

// // //   try {
// // //     const event = await Event.findById(eventId);

// // //     if (!event) {
// // //       return res.status(404).json({ msg: "Event not found" });
// // //     }

// // //     // Create guest
// // //     const guest = await Guest.create({
// // //       event: eventId,
// // //       name,
// // //       email,
// // //       phone,
// // //       address,
// // //     });

// // //     /**
// // //      * SEND INVITE EMAIL (Non-blocking)
// // //      */
// // //     if (email) {
// // //       try {
// // //         const rsvpLink = `${process.env.CLIENT_URL}/w/${event.slug}`;

// // //         const htmlContent = rsvpInviteTemplate({
// // //           name,
// // //           eventTitle: event.title,
// // //           rsvpLink,
// // //         });

// // //         await sendEmail({
// // //           email, // recipient
// // //           subject: `You're Invited to ${event.title}`, // Removed emoji
// // //           html: htmlContent, // Use template
// // //           // message: plain text version (optional but recommended)
// // //           message: `Hi ${name},\n\nYou’ve been invited to ${event.title}.\n\nPlease RSVP here: ${rsvpLink}`,
// // //         });

// // //         console.log(`Invite email sent to ${email}`);
// // //       } catch (emailErr) {
// // //         console.error("Failed to send invite email:", emailErr.message);
// // //         // Do NOT fail the whole request if email fails
// // //       }
// // //     }

// // //     return res.status(201).json({
// // //       success: true,
// // //       message: "Guest created successfully",
// // //       data: guest,
// // //     });
// // //   } catch (err) {
// // //     console.error(err);
// // //     return res.status(500).json({ msg: "Server error" });
// // //   }
// // // };

// // // /**
// // //  * GET GUESTS BY EVENT
// // //  */
// // // const getGuestsByEvent = async (req, res) => {
// // //   try {
// // //     const guests = await Guest.find({ event: req.params.eventId });
// // //     return res.json(guests);
// // //   } catch (err) {
// // //     console.error(err);
// // //     return res.status(500).json({ msg: "Server error" });
// // //   }
// // // };

// // // /**
// // //  * UPDATE GUEST
// // //  */
// // // const updateGuest = async (req, res) => {
// // //   const {
// // //     name,
// // //     email,
// // //     phone,
// // //     address,
// // //     isAttending,
// // //     plusOne,
// // //     dietaryRestrictions,
// // //     tableNumber,
// // //   } = req.body;

// // //   try {
// // //     let guest = await Guest.findById(req.params.guestId);

// // //     if (!guest) {
// // //       return res.status(404).json({ msg: "Guest not found" });
// // //     }

// // //     guest.name = name ?? guest.name;
// // //     guest.email = email ?? guest.email;
// // //     guest.phone = phone ?? guest.phone;
// // //     guest.address = address ?? guest.address;
// // //     guest.isAttending =
// // //       isAttending !== undefined ? isAttending : guest.isAttending;
// // //     guest.plusOne = plusOne ?? guest.plusOne;
// // //     guest.dietaryRestrictions =
// // //       dietaryRestrictions ?? guest.dietaryRestrictions;
// // //     guest.tableNumber = tableNumber ?? guest.tableNumber;

// // //     await guest.save();

// // //     return res.json(guest);
// // //   } catch (err) {
// // //     console.error(err);
// // //     return res.status(500).json({ msg: "Server error" });
// // //   }
// // // };

// // // module.exports = {
// // //   createGuest,
// // //   getGuestsByEvent,
// // //   updateGuest,
// // // };

// // const Guest = require("../models/Guest.model");
// // const Event = require("../models/Event.model");
// // const { sendEmail } = require("../services/email.service");
// // const { rsvpInviteTemplate } = require("../utils/email.templates");

// // /**
// //  * CREATE GUEST
// //  */
// // // const createGuest = async (req, res) => {
// // //   const { eventId, name, email, phone, address } = req.body;

// // //   try {
// // //     const event = await Event.findById(eventId);

// // //     if (!event) {
// // //       return res.status(404).json({ msg: "Event not found" });
// // //     }

// // //     const guest = await Guest.create({
// // //       event: eventId,
// // //       name,
// // //       email,
// // //       phone,
// // //       address,
// // //     });

// // //     /**
// // //      * 📧 SEND INVITE EMAIL (FIXED)
// // //      */
// // //     if (email) {
// // //       try {
// // //         const rsvpLink = `${process.env.CLIENT_URL}/w/${event.slug}`;

// // //         const htmlContent = rsvpInviteTemplate({
// // //           name,
// // //           eventTitle: event.title,
// // //           rsvpLink,
// // //         });

// // //         await sendEmail({
// // //           to: email, // ✅ FIXED HERE
// // //           subject: `You're Invited to ${event.title}`,
// // //           html: htmlContent,
// // //           message: `Hi ${name},

// // // You’ve been invited to ${event.title}.

// // // Please RSVP here: ${rsvpLink}`,
// // //         });

// // //         console.log(`Invite email sent to ${email}`);
// // //       } catch (emailErr) {
// // //         console.error("Failed to send invite email:", emailErr.message);
// // //       }
// // //     }

// // //     return res.status(201).json({
// // //       success: true,
// // //       message: "Guest created successfully",
// // //       data: guest,
// // //     });
// // //   } catch (err) {
// // //     console.error(err);
// // //     return res.status(500).json({ msg: "Server error" });
// // //   }
// // // };

// // const createGuest = async (req, res) => {
// //   const { eventId, name, email, phone, address } = req.body;

// //   try {
// //     const event = await Event.findById(eventId);

// //     if (!event) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Event not found",
// //       });
// //     }

// //     const normalizedEmail = email?.toLowerCase();

// //     /**
// //      * 🔍 CHECK IF GUEST EXISTS
// //      */
// //     let guest = await Guest.findOne({
// //       event: eventId,
// //       email: normalizedEmail,
// //     });

// //     /**
// //      * 👤 UPDATE OR CREATE
// //      */
// //     if (guest) {
// //       guest.name = name ?? guest.name;
// //       guest.phone = phone ?? guest.phone;
// //       guest.address = address ?? guest.address;

// //       await guest.save();
// //     } else {
// //       guest = await Guest.create({
// //         event: eventId,
// //         name,
// //         email: normalizedEmail,
// //         phone,
// //         address,
// //       });
// //     }

// //     /**
// //      * 📧 SEND INVITE EMAIL (SAFE)
// //      */
// //     if (normalizedEmail) {
// //       try {
// //         const rsvpLink = `${process.env.CLIENT_URL}/w/${event.slug}`;

// //         const htmlContent = rsvpInviteTemplate({
// //           name,
// //           eventTitle: event.title,
// //           rsvpLink,
// //         });

// //         await sendEmail({
// //           to: normalizedEmail,
// //           subject: `You're Invited to ${event.title}`,
// //           html: htmlContent,
// //           message: `Hi ${name}, RSVP here: ${rsvpLink}`,
// //         });
// //       } catch (emailErr) {
// //         console.error("Invite email failed:", emailErr.message);
// //       }
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       message: guest
// //         ? "Guest updated successfully"
// //         : "Guest created successfully",
// //       data: guest,
// //     });
// //   } catch (err) {
// //     console.error("createGuest error:", err);

// //     /**
// //      * 🧠 SAFE FALLBACK FOR DUPLICATE KEY ERROR
// //      */
// //     if (err.code === 11000) {
// //       return res.status(409).json({
// //         success: false,
// //         message: "Guest already exists for this event",
// //       });
// //     }

// //     return res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //     });
// //   }
// // };

// // /**
// //  * GET GUESTS BY EVENT
// //  */
// // const getGuestsByEvent = async (req, res) => {
// //   try {
// //     const guests = await Guest.find({ event: req.params.eventId });
// //     return res.json(guests);
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ msg: "Server error" });
// //   }
// // };

// // /**
// //  * UPDATE GUEST
// //  */
// // const updateGuest = async (req, res) => {
// //   const {
// //     name,
// //     email,
// //     phone,
// //     address,
// //     isAttending,
// //     plusOne,
// //     dietaryRestrictions,
// //     tableNumber,
// //   } = req.body;

// //   try {
// //     let guest = await Guest.findById(req.params.guestId);

// //     if (!guest) {
// //       return res.status(404).json({ msg: "Guest not found" });
// //     }

// //     guest.name = name ?? guest.name;
// //     guest.email = email ?? guest.email;
// //     guest.phone = phone ?? guest.phone;
// //     guest.address = address ?? guest.address;
// //     guest.isAttending =
// //       isAttending !== undefined ? isAttending : guest.isAttending;
// //     guest.plusOne = plusOne ?? guest.plusOne;
// //     guest.dietaryRestrictions =
// //       dietaryRestrictions ?? guest.dietaryRestrictions;
// //     guest.tableNumber = tableNumber ?? guest.tableNumber;

// //     await guest.save();

// //     return res.json(guest);
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ msg: "Server error" });
// //   }
// // };

// // module.exports = {
// //   createGuest,
// //   getGuestsByEvent,
// //   updateGuest,
// // };

// const Guest = require("../models/Guest.model");
// const Event = require("../models/Event.model");
// const { sendEmail } = require("../services/email.service");
// const { rsvpInviteTemplate } = require("../utils/email.templates");

// /**
//  * CREATE or UPDATE GUEST + SEND INVITE
//  */
// const createGuest = async (req, res) => {
//   const { eventId, name, email, phone, plusOne, group, notes } = req.body;

//   try {
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({
//         success: false,
//         message: "Event not found",
//       });
//     }

//     const normalizedEmail = email?.trim().toLowerCase();

//     // Check if guest already exists for this event
//     let guest = await Guest.findOne({
//       event: eventId,
//       email: normalizedEmail,
//     });

//     if (guest) {
//       // Update existing guest
//       guest.name = name ?? guest.name;
//       guest.phone = phone ?? guest.phone;
//       guest.plusOne = plusOne ?? guest.plusOne;
//       guest.group = group ?? guest.group;
//       guest.notes = notes ?? guest.notes;

//       await guest.save();

//       return res.status(200).json({
//         success: true,
//         message: "Guest updated successfully",
//         data: guest,
//       });
//     }

//     // Create new guest
//     guest = await Guest.create({
//       event: eventId,
//       name,
//       email: normalizedEmail,
//       phone,
//       plusOne: plusOne || 0,
//       group,
//       notes,
//     });

//     // Send Invite Email - Tailored for Deborah & Iyanu
//     if (normalizedEmail) {
//       try {
//         const rsvpLink = `${process.env.CLIENT_URL}/${event.slug}/invite`; // ← Changed

//         await sendEmail({
//           to: normalizedEmail,
//           subject: `Wedding Invitation - Deborah & Iyanu`,
//           html: rsvpInviteTemplate({
//             name,
//             eventTitle: event.title || "Deborah & Iyanu Wedding",
//             rsvpLink,
//           }),
//         });

//         console.log(`✅ Invite email sent to ${normalizedEmail}`);
//       } catch (emailErr) {
//         console.error("❌ Invite email failed:", emailErr.message);
//       }
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Guest created successfully",
//       data: guest,
//     });
//   } catch (err) {
//     console.error("createGuest error:", err);

//     if (err.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: "Guest with this email already exists for this event",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
// /**
//  * CREATE MULTIPLE GUESTS (Bulk Upload)
//  * Allows creating many guests at once with group/category
//  */
// const createMultipleGuests = async (req, res) => {
//   const { eventId, guests } = req.body; // guests should be an array

//   try {
//     if (!eventId || !Array.isArray(guests) || guests.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "eventId and guests array are required",
//       });
//     }

//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({
//         success: false,
//         message: "Event not found",
//       });
//     }

//     const normalizedGuests = [];
//     const errors = [];

//     for (const guestData of guests) {
//       const { name, email, phone, plusOne = 0, group, notes } = guestData;

//       if (!name) {
//         errors.push({ name, error: "Name is required" });
//         continue;
//       }

//       const normalizedEmail = email?.trim().toLowerCase();

//       try {
//         // Check if guest already exists
//         let existingGuest = await Guest.findOne({
//           event: eventId,
//           email: normalizedEmail,
//         });

//         if (existingGuest) {
//           // Update existing
//           existingGuest.name = name;
//           existingGuest.phone = phone || existingGuest.phone;
//           existingGuest.plusOne = plusOne;
//           existingGuest.group = group || existingGuest.group;
//           existingGuest.notes = notes || existingGuest.notes;

//           await existingGuest.save();
//           normalizedGuests.push(existingGuest);
//         } else {
//           // Create new guest
//           const newGuest = await Guest.create({
//             event: eventId,
//             name,
//             email: normalizedEmail,
//             phone,
//             plusOne,
//             group: group || null,
//             notes: notes || null,
//           });
//           normalizedGuests.push(newGuest);
//         }
//       } catch (err) {
//         errors.push({ name, email: normalizedEmail, error: err.message });
//       }
//     }

//     // Send invite emails (you can choose to send or not in bulk)
//     // For now, we'll send them one by one (you can optimize later with queue)

//     for (const guest of normalizedGuests) {
//       if (guest.email) {
//         try {
//           const rsvpLink = `${process.env.CLIENT_URL}/w/${event.slug}`;

//           await sendEmail({
//             to: guest.email,
//             subject: `Wedding Invitation - Deborah & Iyanu`,
//             html: rsvpInviteTemplate({
//               name: guest.name,
//               eventTitle: event.title || "Deborah & Iyanu Wedding",
//               rsvpLink,
//             }),
//           });
//         } catch (emailErr) {
//           console.error(
//             `Failed to send invite to ${guest.email}:`,
//             emailErr.message,
//           );
//         }
//       }
//     }

//     return res.status(201).json({
//       success: true,
//       message: `${normalizedGuests.length} guests processed successfully`,
//       count: normalizedGuests.length,
//       errors: errors.length > 0 ? errors : undefined,
//       data: normalizedGuests,
//     });
//   } catch (err) {
//     console.error("createMultipleGuests error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while creating multiple guests",
//     });
//   }
// };
// /**
//  * GET GUESTS BY EVENT
//  */
// const getGuestsByEvent = async (req, res) => {
//   try {
//     const guests = await Guest.find({ event: req.params.eventId }).sort({
//       createdAt: -1,
//     });

//     return res.status(200).json({
//       success: true,
//       count: guests.length,
//       data: guests,
//     });
//   } catch (err) {
//     console.error("getGuestsByEvent error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// /**
//  * UPDATE GUEST
//  */
// const updateGuest = async (req, res) => {
//   try {
//     const guest = await Guest.findById(req.params.guestId);

//     if (!guest) {
//       return res.status(404).json({
//         success: false,
//         message: "Guest not found",
//       });
//     }

//     const { name, email, phone, plusOne, group, notes, status } = req.body;

//     if (name !== undefined) guest.name = name;
//     if (email !== undefined) guest.email = email.trim().toLowerCase();
//     if (phone !== undefined) guest.phone = phone;
//     if (plusOne !== undefined) guest.plusOne = plusOne;
//     if (group !== undefined) guest.group = group;
//     if (notes !== undefined) guest.notes = notes;
//     if (status !== undefined) guest.status = status;

//     await guest.save();

//     return res.status(200).json({
//       success: true,
//       message: "Guest updated successfully",
//       data: guest,
//     });
//   } catch (err) {
//     console.error("updateGuest error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// module.exports = {
//   createGuest,
//   getGuestsByEvent,
//   updateGuest,
//   createMultipleGuests,
// };

const Guest = require("../models/Guest.model");
const Event = require("../models/Event.model");
const { sendEmail } = require("../services/email.service");
const { rsvpInviteTemplate } = require("../utils/email.templates");
const { generateAndUploadQR } = require("../services/qr.service");

/**
 * CREATE SINGLE GUEST + GENERATE HELPER QR CODE
 */
const createGuest = async (req, res) => {
  const { eventId, name, email, phone, plusOne, group, notes } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const normalizedEmail = email?.trim().toLowerCase();

    let guest = await Guest.findOne({ event: eventId, email: normalizedEmail });

    if (guest) {
      // Update existing guest
      guest.name = name ?? guest.name;
      guest.phone = phone ?? guest.phone;
      guest.plusOne = plusOne ?? guest.plusOne;
      guest.group = group ?? guest.group;
      guest.notes = notes ?? guest.notes;
      await guest.save();
    } else {
      // Create new guest
      guest = await Guest.create({
        event: eventId,
        name,
        email: normalizedEmail,
        phone,
        plusOne: plusOne || 0,
        group,
        notes,
      });
    }

    // Generate Helper QR Code (points to guest scan page)
    const guestScanUrl = `${process.env.CLIENT_URL}/guest/${guest._id}`;
    const qrPublicUrl = await generateAndUploadQR(
      guestScanUrl,
      event.slug || "default",
    );

    guest.qrCode = qrPublicUrl;
    await guest.save();

    // Send Invite Email
    if (normalizedEmail) {
      try {
        await sendEmail({
          to: normalizedEmail,
          subject: `Wedding Invitation - Deborah & Iyanu`,
          html: rsvpInviteTemplate({
            name,
            eventTitle: event.title || "Deborah & Iyanu Wedding",
            rsvpLink: `${process.env.CLIENT_URL}/${event.slug}/invite`,
            qrCodeUrl: qrPublicUrl, // Optional: pass to template
          }),
        });
        console.log(`✅ Invite email sent to ${normalizedEmail}`);
      } catch (emailErr) {
        console.error("❌ Invite email failed:", emailErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Guest created successfully",
      data: guest,
    });
  } catch (err) {
    console.error("createGuest error:", err);
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Guest already exists" });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * CREATE MULTIPLE GUESTS (Bulk) + GENERATE QR CODE FOR EACH
 */
const createMultipleGuests = async (req, res) => {
  const { eventId, guests } = req.body;

  try {
    if (!eventId || !Array.isArray(guests) || guests.length === 0) {
      return res.status(400).json({
        success: false,
        message: "eventId and guests array are required",
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const normalizedGuests = [];
    const errors = [];

    for (const guestData of guests) {
      const { name, email, phone, plusOne = 0, group, notes } = guestData;

      if (!name) {
        errors.push({ name: "(no name)", error: "Name is required" });
        continue;
      }

      const normalizedEmail = email?.trim().toLowerCase();

      try {
        let existingGuest = await Guest.findOne({
          event: eventId,
          email: normalizedEmail,
        });

        let guest;

        if (existingGuest) {
          existingGuest.name = name;
          existingGuest.phone = phone || existingGuest.phone;
          existingGuest.plusOne = plusOne;
          existingGuest.group = group || existingGuest.group;
          existingGuest.notes = notes || existingGuest.notes;
          await existingGuest.save();
          guest = existingGuest;
        } else {
          guest = await Guest.create({
            event: eventId,
            name,
            email: normalizedEmail,
            phone,
            plusOne,
            group: group || null,
            notes: notes || null,
          });
        }

        // Generate Helper QR Code for this guest
        const guestScanUrl = `${process.env.CLIENT_URL}/guest/${guest._id}`;
        const qrPublicUrl = await generateAndUploadQR(
          guestScanUrl,
          event.slug || "default",
        );

        guest.qrCode = qrPublicUrl;
        await guest.save();

        normalizedGuests.push(guest);

        // Send individual invite email
        if (normalizedEmail) {
          try {
            await sendEmail({
              to: normalizedEmail,
              subject: `Wedding Invitation - Deborah & Iyanu`,
              html: rsvpInviteTemplate({
                name: guest.name,
                eventTitle: event.title || "Deborah & Iyanu Wedding",
                rsvpLink: `${process.env.CLIENT_URL}/${event.slug}/invite`,
                qrCodeUrl: qrPublicUrl,
              }),
            });
          } catch (emailErr) {
            console.error(
              `Failed to send invite to ${normalizedEmail}:`,
              emailErr.message,
            );
          }
        }
      } catch (err) {
        errors.push({ name, email: normalizedEmail, error: err.message });
      }
    }

    return res.status(201).json({
      success: true,
      message: `${normalizedGuests.length} guests processed successfully`,
      count: normalizedGuests.length,
      errors: errors.length > 0 ? errors : undefined,
      data: normalizedGuests,
    });
  } catch (err) {
    console.error("createMultipleGuests error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while creating multiple guests",
    });
  }
};

/**
 * GET GUESTS BY EVENT
 */
const getGuestsByEvent = async (req, res) => {
  try {
    const guests = await Guest.find({ event: req.params.eventId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: guests.length,
      data: guests,
    });
  } catch (err) {
    console.error("getGuestsByEvent error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * UPDATE GUEST
 */
const updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.guestId);
    if (!guest) {
      return res
        .status(404)
        .json({ success: false, message: "Guest not found" });
    }

    const { name, email, phone, plusOne, group, notes, status } = req.body;

    if (name !== undefined) guest.name = name;
    if (email !== undefined) guest.email = email.trim().toLowerCase();
    if (phone !== undefined) guest.phone = phone;
    if (plusOne !== undefined) guest.plusOne = plusOne;
    if (group !== undefined) guest.group = group;
    if (notes !== undefined) guest.notes = notes;
    if (status !== undefined) guest.status = status;

    await guest.save();

    return res.status(200).json({
      success: true,
      message: "Guest updated successfully",
      data: guest,
    });
  } catch (err) {
    console.error("updateGuest error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
const getGuestById = async (req, res) => {
  try {
    const { id } = req.params;

    const guest = await Guest.findById(id)
      .populate("event", "title slug date venue") // Get event details
      .select("-__v");

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found or invalid QR code",
      });
    }

    return res.json({
      success: true,
      data: {
        guestId: guest._id,
        name: guest.name,
        email: guest.email,
        phone: guest.phone,
        plusOne: guest.plusOne,
        group: guest.group,
        notes: guest.notes || "",
        status: guest.status,
        qrCode: guest.qrCode,
        event: guest.event
          ? {
              title: guest.event.title,
              slug: guest.event.slug,
            }
          : null,
      },
    });
  } catch (err) {
    console.error("getGuestById error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
module.exports = {
  createGuest,
  getGuestById,
  createMultipleGuests,
  getGuestsByEvent,
  updateGuest,
};
