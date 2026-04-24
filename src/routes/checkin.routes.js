const express = require("express");
const router = express.Router();

const {
  getCheckinData,
  checkInGuest,
} = require("../controllers/checkin.controller");

/**
 * GET /api/checkin/:id
 */
router.get("/:id", getCheckinData);

/**
 * POST /api/checkin/:id
 */
router.post("/:id", checkInGuest);

module.exports = router;
