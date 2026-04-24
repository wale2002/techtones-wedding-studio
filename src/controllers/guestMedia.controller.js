// const { getEventBySlug } = require('../services/event.service');
// const { uploadGuestMedia } = require('../services/media.service');
// const GuestMedia = require('../models/GuestMedia.model');
// const { sendResponse } = require('../utils/response.utils');

// const uploadMedia = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { guestName } = req.body;
//     const event = await getEventBySlug(slug);
//     if (!event) return sendResponse(res, 404, false, 'Wedding not found');
//     if (!req.file) return sendResponse(res, 400, false, 'Please upload a file');

//     const media = await uploadGuestMedia(event, req.file, guestName);
//     sendResponse(res, 201, true, 'Media uploaded successfully', media);
//   } catch (err) {
//     next(err);
//   }
// };

// const getGallery = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const event = await getEventBySlug(slug);
//     if (!event) return sendResponse(res, 404, false, 'Wedding not found');

//     const gallery = await GuestMedia.find({ event: event._id, isApproved: true }).sort('-createdAt');
//     sendResponse(res, 200, true, 'Gallery retrieved', gallery);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = { uploadMedia, getGallery };
const Event = require("../models/Event.model");
const GuestMedia = require("../models/GuestMedia.model");
const { uploadToCloudinary } = require("../services/cloudinary.service");
const asyncHandler = require("express-async-handler"); // recommended

// @desc    Upload multiple guest media
const uploadGuestMedia = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const guestName = req.body.guestName || "Anonymous";

  // 1. Find event
  const event = await Event.findOne({ slug });

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  // 2. Validate files
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded",
    });
  }

  const uploadedMediaDocs = [];
  const uploadedUrls = [];

  // 3. Upload each file
  for (const file of req.files) {
    try {
      const result = await uploadToCloudinary(
        file.path,
        `weddings/${event.slug}/media`,
      );

      const media = await GuestMedia.create({
        event: event._id,
        guestName,
        mediaUrl: result.secure_url,
        publicId: result.public_id,
        mediaType: result.resource_type === "video" ? "video" : "image",
      });

      uploadedMediaDocs.push(media);

      // ✅ collect only URLs for frontend use
      uploadedUrls.push(result.secure_url);
    } catch (error) {
      console.error(
        `Error uploading file ${file.originalname}:`,
        error.message,
      );
    }
  }

  // 4. Final response (clean + frontend-friendly)
  return res.status(201).json({
    success: true,
    message: `${uploadedUrls.length} media uploaded successfully`,
    mediaUrls: uploadedUrls,
    media: uploadedMediaDocs, // optional (remove if you want strict API)
  });
});

const getGuestMediaByEvent = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const event = await Event.findOne({ slug });
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const media = await GuestMedia.find({ event: event._id }).sort({
    createdAt: -1,
  });

  res.json(media);
});

module.exports = {
  uploadGuestMedia,
  getGuestMediaByEvent,
};
