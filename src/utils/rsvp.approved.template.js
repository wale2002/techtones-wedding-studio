module.exports = (rsvp = {}, qrCodeImage = null, checkinUrl = "") => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    .email-container {
      font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }

    .card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border: 1px solid #eeeeee;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
    }

    .icon {
      font-size: 48px;
      margin-bottom: 10px;
    }

    h2 {
      color: #27ae60;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .details-box {
      background-color: #f8fbf9;
      border-left: 4px solid #27ae60;
      padding: 20px;
      margin: 25px 0;
      border-radius: 0 8px 8px 0;
    }

    .detail-item {
      margin-bottom: 8px;
      font-size: 15px;
    }

    .detail-label {
      font-weight: 600;
      color: #555555;
      width: 120px;
      display: inline-block;
    }

    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 13px;
      color: #888888;
    }

    .qr-section {
      text-align: center;
      margin-top: 25px;
      padding: 25px;
      border: 1px dashed #ddd;
      border-radius: 10px;
      background: #fff;
    }

    .qr-section img {
      width: 200px;
      height: 200px;
      margin: 15px auto;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      display: block;
    }

    .highlight {
      color: #27ae60;
      font-weight: 600;
    }
  </style>
</head>

<body>
  <div class="email-container">
    <div class="card">

      <div class="header">
        <div class="icon">🎉</div>
        <h2>RSVP Confirmed!</h2>
      </div>

      <p>Hi <strong>${rsvp?.name || "Guest"}</strong>,</p>

      <p>
        Wonderful news! Your attendance has been confirmed for the wedding.
      </p>

      <div class="details-box">
        <div class="detail-item">
          <span class="detail-label">Status:</span>
          <span class="highlight">Confirmed</span>
        </div>

        <div class="detail-item">
          <span class="detail-label">Guests:</span>
          <strong>${rsvp?.numberOfGuests ?? 1}</strong>
        </div>

        ${
          rsvp?.dietaryRequirements
            ? `
        <div class="detail-item">
          <span class="detail-label">Dietary:</span>
          <span>${rsvp.dietaryRequirements}</span>
        </div>`
            : ""
        }
      </div>

      ${
        qrCodeImage
          ? `
      <div class="qr-section">
        <h3>Your Entry QR Code</h3>
        <p style="font-size:13px; color:#666; margin-bottom:15px;">
          Present this at the entrance for easy check-in
        </p>

        <img 
          src="${qrCodeImage}" 
          alt="QR Code - Scan at the venue entrance"
          width="200" 
          height="200"
          style="width:200px; height:200px; display:block; margin:0 auto; border:1px solid #eee; border-radius:8px;"
        />

        <!-- Fallback link (very important for email clients that block images) -->
        <p style="font-size:12px; color:#888; margin-top:15px;">
          If the QR code doesn't load, you can also use this link:<br>
          <a href="${checkinUrl}" style="color:#27ae60; word-break:break-all;">${checkinUrl}</a>
        </p>
      </div>`
          : ""
      }

      <p style="text-align:center; margin-top:30px; font-size:16px;">
        We look forward to celebrating with you 💍
      </p>

    </div>

    <div class="footer">
      <p>This is an automated email from the Wedding Platform.</p>
      <p>&copy; ${new Date().getFullYear()} TechTones</p>
    </div>

  </div>
</body>
</html>
  `;
};
