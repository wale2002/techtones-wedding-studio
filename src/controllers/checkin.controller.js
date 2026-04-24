const Rsvp = require("../models/Rsvp.model");

/**
 * 📥 GET CHECK-IN DATA (QR opens this)
 */
const getCheckinData = async (req, res) => {
  try {
    const rsvp = await Rsvp.findById(req.params.id).populate("guest");

    if (!rsvp) {
      return res.status(404).json({
        success: false,
        message: "Invalid QR Code",
      });
    }

    return res.json({
      success: true,
      data: {
        id: rsvp._id,
        name: rsvp.name,
        email: rsvp.email,
        guests: rsvp.numberOfGuests,
        checkedIn: rsvp.checkedIn || false,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * ✅ CHECK-IN GUEST (STAFF ACTION)
 */
const checkInGuest = async (req, res) => {
  try {
    const rsvp = await Rsvp.findById(req.params.id);

    if (!rsvp) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    if (rsvp.checkedIn) {
      return res.json({
        success: false,
        message: "Already checked in",
      });
    }

    rsvp.checkedIn = true;
    rsvp.checkedInAt = new Date(); // optional but recommended
    await rsvp.save();

    return res.json({
      success: true,
      message: "Guest checked in successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getCheckinData,
  checkInGuest,
};
