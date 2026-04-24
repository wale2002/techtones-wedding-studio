// // const express = require("express");
// // const router = express.Router();

// // const rsvpController = require("../controllers/rsvp.controller");
// // const { check } = require("express-validator");
// // const validate = require("../middleware/validate.middleware");

// // /**
// //  * 🌍 PUBLIC RSVP ROUTE
// //  * POST /w/:slug/rsvp
// //  */
// // router.post(
// //   "/w/:slug/rsvp",
// //   [
// //     check("name", "Guest name is required").not().isEmpty(),
// //     check("attending", "Attending status is required").isBoolean(),
// //     check("email", "Invalid email").optional().isEmail(),
// //     check("numberOfGuests", "Must be a number").optional().isNumeric(),
// //   ],
// //   validate,
// //   rsvpController.submitRsvp,
// // );

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const { submitRsvp } = require("../controllers/rsvp.controller");
// const { check } = require("express-validator");
// const validate = require("../middleware/validate.middleware");

// // PUBLIC ONLY
// router.post(
//   "/w/:slug/rsvp",
//   [
//     check("name", "Name required").not().isEmpty(),
//     check("attending", "attending must be boolean").isBoolean(),
//     check("email").optional().isEmail(),
//     check("numberOfGuests").optional().isNumeric(),
//   ],
//   validate,
//   submitRsvp,
// );

// module.exports = router;

const express = require("express");
const router = express.Router();

const { submitRsvp, approveRsvp } = require("../controllers/rsvp.controller");
const { check } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const { protect } = require("../middleware/auth.middleware");

// PUBLIC
router.post(
  "/w/:slug/rsvp",
  [
    check("name", "Name required").not().isEmpty(),
    check("attending").isBoolean(),
  ],
  validate,
  submitRsvp,
);

// PRIVATE (ADMIN / COUPLE ONLY)
router.put("/api/rsvp/:id/approve", protect, approveRsvp);

module.exports = router;
