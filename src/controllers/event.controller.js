const Event = require("../models/Event.model");
const { sendResponse } = require("../utils/response.utils");

const createEvent = async (req, res, next) => {
  try {
    // Protect ownership - never trust frontend for couple
    if (!req.user || !req.user.id) {
      return sendResponse(res, 401, false, "Not authorized");
    }

    req.body.couple = req.user.id; // or req.user._id depending on your JWT payload

    const event = await Event.create(req.body);

    sendResponse(res, 201, true, "Event created successfully", event);
  } catch (err) {
    next(err); // Safe only because Express calls this with next
  }
};

const getPublicEvent = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug })
      .populate("couple", "name coupleName") // populate useful fields if needed
      .select("-__v"); // optional

    if (!event) {
      return sendResponse(res, 404, false, "Wedding / Event not found");
    }

    sendResponse(res, 200, true, "Event retrieved successfully", event);
  } catch (err) {
    next(err);
  }
};

module.exports = { createEvent, getPublicEvent };
