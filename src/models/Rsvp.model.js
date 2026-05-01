// // const mongoose = require('mongoose');

// // const RsvpSchema = new mongoose.Schema(
// //   {
// //     event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
// //     guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest' },
// //     name: { type: String, required: true }, // For non-pre-listed guests
// //     email: { type: String },
// //     attending: { type: Boolean, required: true },
// //     numberOfGuests: { type: Number, default: 1 },
// //     dietaryRequirements: { type: String },
// //     message: { type: String },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model('Rsvp', RsvpSchema);

// const mongoose = require("mongoose");

// const RsvpSchema = new mongoose.Schema(
//   {
//     event: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Event",
//       required: true,
//     },
//     guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },

//     name: { type: String, required: true },
//     email: { type: String },

//     attending: { type: Boolean, required: true },
//     numberOfGuests: { type: Number, default: 1 },
//     dietaryRequirements: { type: String },
//     message: { type: String },

//     // ✅ ADD THIS FIELD
//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//     },

//     // (optional but recommended for your QR system)
//     checkedIn: {
//       type: Boolean,
//       default: false,
//     },

//     checkedInAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Rsvp", RsvpSchema);

const mongoose = require("mongoose");

const RsvpSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    // Link to Guest model (if the guest was pre-invited)
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
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
    },

    attending: {
      type: Boolean,
      required: true,
    },

    message: {
      type: String,
      trim: true,
      required: false,
    },

    // RSVP Workflow Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // QR Code & Check-in fields
    qrCode: {
      type: String, // Cloudinary URL or Base64
    },

    checkedIn: {
      type: Boolean,
      default: false,
    },

    checkedInAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Indexes
RsvpSchema.index({ event: 1, email: 1 });
RsvpSchema.index({ status: 1 });

module.exports = mongoose.model("Rsvp", RsvpSchema);
