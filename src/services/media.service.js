const GuestMedia = require('../models/GuestMedia.model');
const { uploadToCloudinary } = require('./cloudinary.service');

const uploadGuestMedia = async (event, file, guestName) => {
  const result = await uploadToCloudinary(file.path, `weddings/${event.slug}/media`);
  
  const media = await GuestMedia.create({
    event: event._id,
    guestName,
    mediaUrl: result.secure_url,
    publicId: result.public_id,
    mediaType: result.resource_type === 'video' ? 'video' : 'image',
  });

  return media;
};

module.exports = { uploadGuestMedia };
