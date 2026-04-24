const rsvpInviteTemplate = ({ name, eventTitle, rsvpLink }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Invited</title>
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      background: #f4f4f4; 
      font-family: Arial, Helvetica, sans-serif; 
    }
    .container { 
      max-width: 600px; 
      margin: 20px auto; 
      background: #ffffff; 
      border-radius: 8px; 
      overflow: hidden; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.08); 
    }
    .header { 
      background: #2c3e50; 
      color: white; 
      padding: 35px 40px; 
      text-align: center; 
    }
    .content { 
      padding: 40px; 
      color: #333333; 
      line-height: 1.7; 
    }
    .button { 
      display: inline-block; 
      padding: 14px 28px; 
      background: #e74c3c; 
      color: white; 
      text-decoration: none; 
      border-radius: 6px; 
      font-weight: bold; 
      margin: 25px 0; 
      font-size: 16px;
    }
    .footer { 
      background: #f8f8f8; 
      padding: 25px; 
      text-align: center; 
      font-size: 13px; 
      color: #777777; 
      border-top: 1px solid #eeeeee;
    }
    h1 { margin: 0; font-size: 28px; }
    p { margin: 16px 0; }
    strong { color: #2c3e50; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>You're Invited</h1>
    </div>
    
    <div class="content">
      <p>Hi <strong>${name}</strong>,</p>
      
      <p>You’ve been invited to <strong>${eventTitle}</strong>.</p>
      
      <p>Please confirm your attendance by clicking the button below:</p>
      
      <a href="${rsvpLink}" class="button">RSVP Now</a>
      
      <p style="margin-top: 30px; font-size: 15px; color: #555555;">
        We look forward to celebrating with you.
      </p>
    </div>
    
    <div class="footer">
      <p>This is an automated message from your wedding platform.</p>
      <p>© ${new Date().getFullYear()} TechTones</p>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * RSVP Confirmation Template - Sent after guest confirms attendance
 */
const rsvpConfirmationTemplate = ({ name, eventTitle }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSVP Received</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f5f7fa;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: auto;
      background: #fff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    }

    .header {
      background: linear-gradient(135deg, #667eea, #764ba2);
      padding: 40px;
      text-align: center;
      color: white;
    }

    .header h1 {
      font-size: 26px;
    }

    .header p {
      opacity: 0.9;
      margin-top: 8px;
    }

    .content {
      padding: 40px;
      color: #333;
      line-height: 1.7;
    }

    .badge {
      display: inline-block;
      background: #fff3cd;
      color: #856404;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 13px;
      margin-bottom: 20px;
    }

    .highlight {
      background: #f3f4ff;
      border-left: 4px solid #667eea;
      padding: 16px;
      margin: 20px 0;
      border-radius: 6px;
    }

    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #888;
      background: #f9f9f9;
    }

    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
    }
  </style>
</head>

<body>
  <div class="container">

    <!-- HEADER -->
    <div class="header">
      <h1>📩 RSVP Received</h1>
      <p>We’ve successfully received your response</p>
    </div>

    <!-- CONTENT -->
    <div class="content">

      <span class="badge">Status: Pending Approval</span>

      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Thank you for submitting your RSVP for <strong>${eventTitle}</strong>.
        We are excited to have you potentially join us for this special occasion.
      </p>

      <div class="highlight">
        <strong>What happens next?</strong><br><br>
        Your RSVP is currently under review. Once approved, you will receive a confirmation email with your entry details.
      </div>

      <p>
        Please keep an eye on your email for updates regarding your attendance status.
      </p>

      <a class="btn" href="mailto:info@techtones.com">
        Contact Support
      </a>

    </div>

    <!-- FOOTER -->
    <div class="footer">
      This is an automated message from TechTones<br>
      © ${new Date().getFullYear()} All rights reserved
    </div>

  </div>
</body>
</html>
  `;
};
module.exports = {
  rsvpInviteTemplate,
  rsvpConfirmationTemplate,
};
