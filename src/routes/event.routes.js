// const express = require('express');
// const { getPublicEvent, createEvent } = require('../controllers/event.controller');
// const { submitRsvp } = require('../controllers/rsvp.controller');
// const { uploadMedia, getGallery } = require('../controllers/guestMedia.controller');
// const { protect } = require('../middleware/auth.middleware');
// const upload = require('../config/multer');

// const router = express.Router();

// // Public routes (Slug-based)
// router.get('/w/:slug', getPublicEvent);
// router.post('/w/:slug/rsvp', submitRsvp);
// router.post('/w/:slug/media', upload.single('media'), uploadMedia);
// router.get('/w/:slug/gallery', getGallery);

// // Private routes
// router.post('/api/events', protect, createEvent);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getPublicEvent,
  createEvent,
  updateEvent,
} = require("../controllers/event.controller");
const { submitRsvp } = require("../controllers/rsvp.controller");
const {
  uploadGuestMedia,
  getGuestMediaByEvent,
} = require("../controllers/guestMedia.controller");

const { protect } = require("../middleware/auth.middleware");
const upload = require("../config/multer");

// ========================
// PUBLIC ROUTES (NO AUTH)
// ========================

// Get wedding by slug
router.get("/w/:slug", getPublicEvent);

// RSVP
router.post("/w/:slug/rsvp", submitRsvp);

// // MEDIA UPLOAD (FIXED multer usage below)
// router.post(
//   "/w/:slug/media",
//   upload.array("media", 10), // ✅ FIX: supports multiple files
//   uploadGuestMedia,
// );
router.put("/:id", protect, updateEvent); // protect = your auth middleware
// GALLERY
router.get("/w/:slug/gallery", getGuestMediaByEvent);

// ========================
// PRIVATE ROUTES
// ========================
router.post("/", protect, createEvent);

module.exports = router;
