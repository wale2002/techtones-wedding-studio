const { sendEmail } = require("../services/email.service");
const { rsvpConfirmationTemplate } = require("../utils/email.templates");

/**
 * Create RSVP email job
 */
const createRsvpEmailJob = (guestEmail, name, eventTitle) => {
  return async () => {
    await sendEmail({
      to: guestEmail,
      subject: `RSVP Confirmation - ${eventTitle}`,
      html: rsvpConfirmationTemplate({ name, eventTitle }),
    });
  };
};

module.exports = { createRsvpEmailJob };
