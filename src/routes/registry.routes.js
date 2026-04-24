const express = require("express");
const router = express.Router();

const registryController = require("../controllers/registry.controller");
const { protect } = require("../middleware/auth.middleware");

/**
 * 🟢 ADMIN ROUTES
 */

// Create registry for an event
router.post("/", protect, registryController.createRegistry);

// Add gift to registry
router.post(
  "/:registryId/gifts",
  protect,
  registryController.addGiftToRegistry,
);

// Mark gift as purchased
router.put("/:registryId/gifts/:giftId", registryController.markGiftPurchased);

/**
 * 🌍 PUBLIC ROUTE
 */

// Get registry by event slug (NO AUTH)
router.get("/w/:slug", registryController.getRegistryByEvent);

module.exports = router;
