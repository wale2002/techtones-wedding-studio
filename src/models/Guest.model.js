// const mongoose = require("mongoose");

// const GuestSchema = new mongoose.Schema(
//   {
//     event: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Event",
//       required: true,
//     },
//     name: { type: String, required: true },
//     email: { type: String },
//     phone: { type: String },

//     // ONLY invitation status (NOT RSVP workflow)
//     status: {
//       type: String,
//       enum: ["invited", "confirmed", "declined"],
//       default: "invited",
//     },

//     group: { type: String },
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Guest", GuestSchema);

const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    // Invitation Status
    status: {
      type: String,
      enum: ["invited", "confirmed", "declined"],
      default: "invited",
    },

    // Number of additional guests (plus one)
    // Can be 0, 4, 5, 9, etc. as per your requirement
    plusOne: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Optional fields
    group: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },
    qrCode: {
      type: String, // Will store Cloudinary URL or check-in link
    },
    // Removed dietaryRestrictions as requested
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate guests for the same event by email
GuestSchema.index({ event: 1, email: 1 }, { unique: true });

// Text search index
GuestSchema.index({ name: "text", email: "text" });

module.exports = mongoose.model("Guest", GuestSchema);
