const express = require("express");
const router = express.Router();

const { getQr } = require("../controllers/qr.controller");

// GET QR CODE
router.get("/:slug", getQr);

module.exports = router;
