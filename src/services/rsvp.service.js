const Rsvp = require("../models/Rsvp.model");
const Guest = require("../models/Guest.model");

/**
 * 🧠 MAIN RSVP PROCESSOR (CLEAN VERSION)
 * - NO EMAILS
 * - NO QR
 * - NO "pending" in Guest (FIXED)
 */
const processRsvp = async (event, rsvpData) => {
  const {
    name,
    email,
    attending,
    numberOfGuests,
    dietaryRequirements,
    message,
  } = rsvpData;

  const normalizedEmail = email?.toLowerCase();

  let guest;

  /**
   * 🔍 FIND EXISTING GUEST
   */
  if (normalizedEmail) {
    guest = await Guest.findOne({
      event: event._id,
      email: normalizedEmail,
    });
  }

  /**
   * 👤 CREATE OR UPDATE GUEST
   * FIX: NO "pending" anywhere
   */
  if (!guest) {
    guest = await Guest.create({
      event: event._id,
      name,
      email: normalizedEmail,
      status: attending ? "confirmed" : "declined",
    });
  } else {
    guest.name = name || guest.name;
    guest.email = normalizedEmail || guest.email;

    // ✅ FIXED: valid enum values only
    guest.status = attending ? "confirmed" : "declined";

    await guest.save();
  }

  /**
   * 🚫 PREVENT DUPLICATE RSVP
   */
  let rsvp = await Rsvp.findOne({
    event: event._id,
    guest: guest._id,
  });

  if (rsvp) {
    rsvp.name = name;
    rsvp.email = normalizedEmail;
    rsvp.attending = attending;
    rsvp.numberOfGuests = attending ? numberOfGuests || 1 : 0;
    rsvp.dietaryRequirements = dietaryRequirements;
    rsvp.message = message;

    await rsvp.save();
    return rsvp;
  }

  /**
   * 📝 CREATE RSVP
   */
  rsvp = await Rsvp.create({
    event: event._id,
    guest: guest._id,
    name,
    email: normalizedEmail,
    attending,
    numberOfGuests: attending ? numberOfGuests || 1 : 0,
    dietaryRequirements,
    message,
  });

  return rsvp;
};

module.exports = { processRsvp };
