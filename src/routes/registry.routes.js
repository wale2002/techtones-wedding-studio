// const express = require("express");
// const router = express.Router();

// const registryController = require("../controllers/registry.controller");
// const { protect } = require("../middleware/auth.middleware");

// /**
//  * 🟢 ADMIN ROUTES
//  */

// // Create registry for an event
// router.post("/", protect, registryController.createRegistry);
// router.get("/", protect, registryController.getAllRegistries);
// // Add gift to registry
// router.post(
//   "/:registryId/gifts",
//   protect,
//   registryController.addGiftToRegistry,
// );

// // Mark gift as purchased
// router.put("/:registryId/gifts/:giftId", registryController.markGiftPurchased);

// /**
//  * 🌍 PUBLIC ROUTE
//  */

// // Get registry by event slug (NO AUTH)
// router.get("/w/:slug", registryController.getRegistryByEvent);

// module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");

const registryController = require("../controllers/registry.controller");
const { protect } = require("../middleware/auth.middleware");

/**
 * 🟢 ADMIN / COUPLE ROUTES (Protected)
 */

// Create registry (only one allowed per event)
router.post("/", protect, registryController.createRegistry);

// Get all registries (useful for admin dashboard)
router.get("/", protect, registryController.getAllRegistries);

// Get ONE registry by ID (for couple to view/edit their registry)
router.get("/:registryId", protect, registryController.getRegistryById);
router.delete(
  "/:registryId/gifts/:giftId",
  protect, // Protect with admin/auth middleware
  registryController.deleteGiftFromRegistry,
);
// Add gift to a registry

router.post(
  "/:registryId/gifts",
  upload.single("image"), // ← important: 'image' is the field name
  registryController.addGiftToRegistry,
);

// Mark gift as purchased (can be public or protected depending on your flow)
router.put("/:registryId/gifts/:giftId", registryController.markGiftPurchased);

/**
 * 🌍 PUBLIC ROUTE
 */

// Get registry by event slug - for guests to view
router.get("/w/:slug", registryController.getRegistryByEvent);

module.exports = router;
