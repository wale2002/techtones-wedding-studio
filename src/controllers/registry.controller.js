// const Registry = require("../models/Registry.model");
// const Event = require("../models/Event.model");

// exports.createRegistryItem = async (req, res) => {
//   const { eventId, itemName, itemUrl, price } = req.body;
//   try {
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ msg: "Event not found" });
//     }

//     const newItem = new Registry({
//       event: eventId,
//       itemName,
//       itemUrl,
//       price,
//     });

//     const registryItem = await newItem.save();
//     res.json(registryItem);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// exports.getRegistryItemsByEvent = async (req, res) => {
//   try {
//     const registryItems = await Registry.find({ event: req.params.eventId });
//     res.json(registryItems);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// exports.updateRegistryItem = async (req, res) => {
//   const { itemName, itemUrl, price, isGifted, giftedBy } = req.body;
//   try {
//     let registryItem = await Registry.findById(req.params.itemId);
//     if (!registryItem) {
//       return res.status(404).json({ msg: "Registry item not found" });
//     }

//     registryItem.itemName = itemName || registryItem.itemName;
//     registryItem.itemUrl = itemUrl || registryItem.itemUrl;
//     registryItem.price = price || registryItem.price;
//     registryItem.isGifted = isGifted !== undefined ? isGifted : registryItem.isGifted;
//     registryItem.giftedBy = giftedBy || registryItem.giftedBy;

//     await registryItem.save();
//     res.json(registryItem);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

const Registry = require("../models/Registry.model");
const Event = require("../models/Event.model");

/**
 * 🟢 CREATE REGISTRY (ADMIN ONLY)
 */
/**
 * 🟢 CREATE REGISTRY (ADMIN ONLY) - Only One Allowed
 */
exports.createRegistry = async (req, res) => {
  try {
    const { eventId, title, description } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check if a registry already exists for this event
    const existingRegistry = await Registry.findOne({ event: eventId });

    if (existingRegistry) {
      return res.status(400).json({
        msg: "A registry already exists for this event. Only one registry is allowed.",
      });
    }

    const registry = await Registry.create({
      event: eventId,
      title: title || "Our Wedding Registry",
      description: description || "",
      gifts: [],
    });

    res.status(201).json({
      success: true,
      msg: "Registry created successfully",
      data: registry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * 🟢 ADD GIFT TO REGISTRY (ADMIN ONLY)
 */
exports.addGiftToRegistry = async (req, res) => {
  try {
    const { registryId } = req.params;
    const { name, description, price, url, imageUrl } = req.body;

    const registry = await Registry.findById(registryId);
    if (!registry) {
      return res.status(404).json({ msg: "Registry not found" });
    }

    registry.gifts.push({
      name,
      description,
      price,
      url,
      imageUrl,
    });

    await registry.save();

    res.status(201).json(registry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

/**
 * 🌍 PUBLIC: GET REGISTRY BY EVENT SLUG
 */
/**
 * 🌍 PUBLIC: GET REGISTRY BY EVENT SLUG
 */
exports.getRegistryByEvent = async (req, res) => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug });
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    const registry = await Registry.findOne({ event: event._id }).populate(
      "event",
      "title slug",
    ); // Optional: get event details too

    if (!registry) {
      return res.status(404).json({ msg: "No registry found for this event" });
    }

    res.json({
      success: true,
      data: registry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
/**
 * 🟡 GET SINGLE REGISTRY BY ID (for Couple Dashboard)
 */
exports.getRegistryById = async (req, res) => {
  try {
    const { registryId } = req.params;

    const registry = await Registry.findById(registryId).populate(
      "event",
      "title slug",
    );

    if (!registry) {
      return res.status(404).json({ msg: "Registry not found" });
    }

    res.json({
      success: true,
      data: registry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
/**
 * 🟡 MARK GIFT AS PURCHASED (USER FLOW)
 */
exports.markGiftPurchased = async (req, res) => {
  try {
    const { registryId, giftId } = req.params;
    const { buyerName } = req.body;

    const registry = await Registry.findById(registryId);
    if (!registry) {
      return res.status(404).json({ msg: "Registry not found" });
    }

    const gift = registry.gifts.id(giftId);
    if (!gift) {
      return res.status(404).json({ msg: "Gift not found" });
    }

    gift.isPurchased = true;
    gift.giftedBy = buyerName;

    await registry.save();

    res.json(registry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
/**
 * 📦 GET ALL REGISTRIES (ADMIN)
 */
exports.getAllRegistries = async (req, res) => {
  try {
    const registries = await Registry.find()
      .sort({ createdAt: -1 })
      .populate("event", "title slug");

    const formatted = registries.map((reg) => {
      const gifts = reg.gifts || [];

      return {
        id: reg._id,
        title: reg.title,
        description: reg.description,
        eventTitle: reg.event?.title || null,
        eventSlug: reg.event?.slug || null,

        totalGifts: gifts.length,
        totalValue: gifts.reduce((sum, g) => sum + (g.price || 0), 0),
        purchasedCount: gifts.filter((g) => g.isPurchased).length,

        createdAt: reg.createdAt,
      };
    });

    return res.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (err) {
    console.error("getAllRegistries error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
/**
 * 🗑️ DELETE GIFT FROM REGISTRY (ADMIN ONLY)
 */
exports.deleteGiftFromRegistry = async (req, res) => {
  try {
    const { registryId, giftId } = req.params;

    const registry = await Registry.findById(registryId);
    if (!registry) {
      return res.status(404).json({
        success: false,
        msg: "Registry not found",
      });
    }

    // Find the gift and remove it
    const giftIndex = registry.gifts.findIndex(
      (gift) => gift._id.toString() === giftId,
    );

    if (giftIndex === -1) {
      return res.status(404).json({
        success: false,
        msg: "Gift not found in registry",
      });
    }

    // Remove the gift from the array
    registry.gifts.splice(giftIndex, 1);

    await registry.save();

    res.json({
      success: true,
      msg: "Gift deleted successfully",
      data: registry,
    });
  } catch (err) {
    console.error("Delete gift error:", err);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};
