const express = require("express");
const router = express.Router();

const guestController = require("../controllers/guest.controller");
const { protect } = require("../middleware/auth.middleware"); // ✅ FIXED
const { check } = require("express-validator");
const validate = require("../middleware/validate.middleware");

// CREATE GUEST
router.post(
  "/",
  protect, // ✅ FIXED (was auth object)
  [
    check("eventId", "Event ID is required").not().isEmpty(),
    check("name", "Guest name is required").not().isEmpty(),
  ],
  validate,
  guestController.createGuest,
);
router.post("/bulk", protect, guestController.createMultipleGuests);
// GET GUESTS BY EVENT
router.get("/events/:eventId", protect, guestController.getGuestsByEvent);
router.get("/:id", guestController.getGuestById); // Important for QR scanning
// UPDATE GUEST
router.put("/:guestId", protect, guestController.updateGuest);

module.exports = router;
