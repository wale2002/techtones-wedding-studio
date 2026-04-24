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
exports.createRegistry = async (req, res) => {
  try {
    const { eventId, title, description } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    const registry = await Registry.create({
      event: eventId,
      title: title || "Our Wedding Registry",
      description: description || "",
      gifts: [],
    });

    res.status(201).json(registry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
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
exports.getRegistryByEvent = async (req, res) => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug });
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    const registry = await Registry.findOne({ event: event._id });

    res.json(registry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
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
