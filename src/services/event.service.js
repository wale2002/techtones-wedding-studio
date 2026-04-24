const Event = require("../models/Event.model");

const getEventBySlug = async (slug) => {
  if (!slug) return null;

  const event = await Event.findOne({
    slug: slug.toLowerCase().trim(),
    "settings.isPublic": true, // ensure only public events are accessible
  });

  return event;
};

module.exports = { getEventBySlug };
