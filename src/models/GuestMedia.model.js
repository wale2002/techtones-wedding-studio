const mongoose = require('mongoose');

const GuestMediaSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    guestName: { type: String },
    mediaUrl: { type: String, required: true },
    publicId: { type: String, required: true }, // Cloudinary public ID
    mediaType: { type: String, enum: ['image', 'video'], required: true },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GuestMedia', GuestMediaSchema);
