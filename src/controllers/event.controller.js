// // const Event = require("../models/Event.model");
// // const { sendResponse } = require("../utils/response.utils");

// // const createEvent = async (req, res, next) => {
// //   try {
// //     // Protect ownership - never trust frontend for couple
// //     if (!req.user || !req.user.id) {
// //       return sendResponse(res, 401, false, "Not authorized");
// //     }

// //     req.body.couple = req.user.id; // or req.user._id depending on your JWT payload

// //     const event = await Event.create(req.body);

// //     sendResponse(res, 201, true, "Event created successfully", event);
// //   } catch (err) {
// //     next(err); // Safe only because Express calls this with next
// //   }
// // };

// // const getPublicEvent = async (req, res, next) => {
// //   try {
// //     const { slug } = req.params;

// //     const event = await Event.findOne({ slug })
// //       .populate("couple", "name coupleName") // populate useful fields if needed
// //       .select("-__v"); // optional

// //     if (!event) {
// //       return sendResponse(res, 404, false, "Wedding / Event not found");
// //     }

// //     sendResponse(res, 200, true, "Event retrieved successfully", event);
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // module.exports = { createEvent, getPublicEvent };

// const Event = require("../models/Event.model");
// const { sendResponse } = require("../utils/response.utils");

// /**
//  * CREATE EVENT
//  */
// const createEvent = async (req, res, next) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return sendResponse(res, 401, false, "Not authorized");
//     }

//     // Protect ownership - never trust frontend for couple
//     req.body.couple = req.user.id;

//     const event = await Event.create(req.body);

//     return sendResponse(res, 201, true, "Event created successfully", event);
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * GET PUBLIC EVENT BY SLUG
//  */
// const getPublicEvent = async (req, res, next) => {
//   try {
//     const { slug } = req.params;

//     const event = await Event.findOne({ slug })
//       .populate("couple", "name coupleName")
//       .select("-__v");

//     if (!event) {
//       return sendResponse(res, 404, false, "Wedding / Event not found");
//     }

//     return sendResponse(res, 200, true, "Event retrieved successfully", event);
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * UPDATE EVENT SLUG (NEW ENDPOINT)
//  * Only the owner of the event can change the slug
//  */
// const updateEventSlug = async (req, res, next) => {
//   try {
//     const { slug: newSlug } = req.body;
//     const { id: eventId } = req.params; // event ID from URL

//     if (!req.user || !req.user.id) {
//       return sendResponse(res, 401, false, "Not authorized");
//     }

//     if (!newSlug) {
//       return sendResponse(res, 400, false, "New slug is required");
//     }

//     // Validate slug format (optional but recommended)
//     if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(newSlug)) {
//       return sendResponse(
//         res,
//         400,
//         false,
//         "Slug must be lowercase, numbers and hyphens only",
//       );
//     }

//     const event = await Event.findById(eventId);

//     if (!event) {
//       return sendResponse(res, 404, false, "Event not found");
//     }

//     // Check ownership
//     if (event.couple.toString() !== req.user.id.toString()) {
//       return sendResponse(
//         res,
//         403,
//         false,
//         "You are not authorized to edit this event",
//       );
//     }

//     // Check if the new slug is already taken by another event
//     const existingEvent = await Event.findOne({
//       slug: newSlug,
//       _id: { $ne: eventId },
//     });

//     if (existingEvent) {
//       return sendResponse(
//         res,
//         409,
//         false,
//         "This slug is already taken. Please choose another one.",
//       );
//     }

//     // Update the slug
//     event.slug = newSlug;
//     await event.save();

//     return sendResponse(res, 200, true, "Event slug updated successfully", {
//       id: event._id,
//       slug: event.slug,
//       title: event.title,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = {
//   createEvent,
//   getPublicEvent,
//   updateEventSlug, // ← New endpoint
// };

const Event = require("../models/Event.model");
const { sendResponse } = require("../utils/response.utils");

/**
 * CREATE EVENT
 */
const createEvent = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return sendResponse(res, 401, false, "Not authorized");
    }

    // Secure ownership - never trust frontend for couple
    req.body.couple = req.user.id;

    const event = await Event.create(req.body);

    return sendResponse(res, 201, true, "Event created successfully", event);
  } catch (err) {
    next(err);
  }
};

/**
 * GET PUBLIC EVENT BY SLUG
 */
const getPublicEvent = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug })
      .populate("couple", "name coupleName")
      .select("-__v");

    if (!event) {
      return sendResponse(res, 404, false, "Wedding / Event not found");
    }

    return sendResponse(res, 200, true, "Event retrieved successfully", event);
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE EVENT (Everything)
 * Allows updating title, slug, date, venue, description, etc.
 */
const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      return sendResponse(res, 401, false, "Not authorized");
    }

    const event = await Event.findById(id);

    if (!event) {
      return sendResponse(res, 404, false, "Event not found");
    }

    // Check ownership
    if (event.couple.toString() !== req.user.id.toString()) {
      return sendResponse(
        res,
        403,
        false,
        "You are not authorized to update this event",
      );
    }

    // If user is trying to update the slug, check for uniqueness
    if (req.body.slug) {
      const existingEvent = await Event.findOne({
        slug: req.body.slug,
        _id: { $ne: id },
      });

      if (existingEvent) {
        return sendResponse(
          res,
          409,
          false,
          "This slug is already taken. Please choose another one.",
        );
      }

      // Optional: Validate slug format
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(req.body.slug)) {
        return sendResponse(
          res,
          400,
          false,
          "Slug can only contain lowercase letters, numbers, and hyphens",
        );
      }
    }

    // Update the event with new data
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
    ).populate("couple", "name coupleName");

    return sendResponse(
      res,
      200,
      true,
      "Event updated successfully",
      updatedEvent,
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEvent,
  getPublicEvent,
  updateEvent, // ← Main update endpoint for everything
};
