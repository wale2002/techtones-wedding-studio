const express = require('express');
const { sendTestEmail } = require('../controllers/email.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Private routes for couple/admin to trigger emails
router.post('/send-test', protect, sendTestEmail);

module.exports = router;
