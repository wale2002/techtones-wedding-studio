const Guest = require("../models/Guest.model");

const findOrCreateGuest = async (event, name, email) => {
  let guest = await Guest.findOne({ event, email });

  if (!guest) {
    guest = new Guest({ event, name, email });
    await guest.save();
  }
  return guest;
};

module.exports = { findOrCreateGuest };
