const { sendEmail } = require('../services/email.service');
const { sendResponse } = require('../utils/response.utils');

const sendTestEmail = async (req, res, next) => {
  try {
    const { email, subject, message, html } = req.body;
    
    if (!email) {
      return sendResponse(res, 400, false, 'Recipient email is required');
    }

    await sendEmail({
      email,
      subject: subject || 'Test Wedding Email',
      message: message || 'This is a test email from your wedding platform.',
      html: html || '<p>This is a test email from your wedding platform.</p>',
    });

    sendResponse(res, 200, true, 'Email sent successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = { sendTestEmail };
