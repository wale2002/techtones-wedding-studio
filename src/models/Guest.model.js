const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },

    // ONLY invitation status (NOT RSVP workflow)
    status: {
      type: String,
      enum: ["invited", "confirmed", "declined"],
      default: "invited",
    },

    group: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Guest", GuestSchema);
