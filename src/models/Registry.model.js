// const mongoose = require("mongoose");

// const GiftSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String },
//     price: { type: Number },
//     url: { type: String }, // Amazon / Jumia / external link
//     imageUrl: { type: String },

//     isPurchased: { type: Boolean, default: false },

//     purchasedBy: {
//       type: String, // guest name (no auth required)
//     },

//     message: {
//       type: String, // optional gift note
//     },

//     purchasedAt: {
//       type: Date,
//     },
//   },
//   { _id: true },
// );

// const RegistrySchema = new mongoose.Schema(
//   {
//     event: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Event",
//       required: true,
//     },

//     title: {
//       type: String,
//       default: "Our Wedding Registry",
//     },

//     description: {
//       type: String,
//     },

//     gifts: [GiftSchema],
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Registry", RegistrySchema);

const mongoose = require("mongoose");

const GiftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: String,

    price: Number,

    // ✅ external shopping link (Amazon/Jumia/etc)
    purchaseUrl: String,

    imageUrl: String,

    isPurchased: { type: Boolean, default: false },

    purchasedBy: String,

    message: String,

    purchasedAt: Date,
  },
  { _id: true },
);

const RegistrySchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "Our Wedding Registry",
    },

    description: String,

    gifts: [GiftSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Registry", RegistrySchema);
