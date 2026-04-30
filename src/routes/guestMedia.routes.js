// // const express = require("express");
// // const router = express.Router();
// // const guestMediaController = require("../controllers/guestMedia.controller");
// // const upload = require("../middleware/upload.middleware");

// // // @route   POST /w/:slug/media
// // // @desc    Upload guest media for a public wedding page
// // // @access  Public
// // router.post(
// //   "/w/:slug/media",
// //   upload.single("file"),
// //   guestMediaController.uploadGuestMedia
// // );

// // // @route   GET /w/:slug/gallery
// // // @desc    Get all guest media for a public wedding page
// // // @access  Public
// // router.get("/w/:slug/gallery", guestMediaController.getGuestMediaByEvent);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const guestMediaController = require("../controllers/guestMedia.controller");
// const upload = require("../middleware/upload.middleware");

// // @route   POST /w/:slug/media
// // @desc    Upload multiple guest media (images & videos) for a public wedding page
// // @access  Public
// router.post(
//   "/w/:slug/media",
//   upload.array("file", 10), // ← Changed to .array() + max 10 files
//   guestMediaController.uploadGuestMedia,
// );

// // GET route remains the same
// router.get("/w/:slug/gallery", guestMediaController.getGuestMediaByEvent);

// module.exports = router;

// routes/guestMedia.routes.js
const express = require("express");
const router = express.Router();
const guestMediaController = require("../controllers/guestMedia.controller");
const upload = require("../middleware/upload.middleware");

// ✅ FIXED: match the frontend field name "media"
router.post(
  "/w/:slug/media",
  upload.array("media", 10), // ← changed "file" → "media"
  guestMediaController.uploadGuestMedia,
);

router.get("/w/:slug/gallery", guestMediaController.getGuestMediaByEvent);

module.exports = router;
