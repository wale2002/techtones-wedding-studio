module.exports = (rsvp, qrCodeImage, checkinUrl) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Approved!</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600&family=Great+Vibes&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #f9f6f1;
      font-family: 'Inter', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .wrapper {
      max-width: 620px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 24px 60px rgba(0,0,0,0.10);
      border: 1px solid #ede5d8;
    }

    /* ── HERO ── */
    .hero {
      position: relative;
      height: 260px;
      overflow: hidden;
    }
    .hero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(20,10,5,0.62) 100%);
    }
    .hero-text {
      position: absolute;
      bottom: 28px;
      left: 0; right: 0;
      text-align: center;
      color: #ffffff;
      padding: 0 20px;
    }
    .hero-text .script {
      font-family: 'Great Vibes', cursive;
      font-size: 20px;
      color: #f5d99a;
      display: block;
      margin-bottom: 6px;
    }
    .hero-text h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 40px;
      font-weight: 800;
      line-height: 1.15;
      text-shadow: 0 2px 14px rgba(0,0,0,0.35);
    }

    /* ── ORNAMENT ── */
    .ornament {
      text-align: center;
      padding: 20px 0 4px;
      font-size: 18px;
      color: #c9a96e;
      letter-spacing: 10px;
    }
    .gold-line {
      width: 90px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #c9a96e, transparent);
      margin: 10px auto 22px;
    }

    /* ── CONTENT ── */
    .content {
      padding: 10px 44px 40px;
      color: #4a3f35;
      font-size: 16px;
      line-height: 1.85;
      text-align: center;
    }
    .content p { margin-bottom: 16px; }
    .content strong { color: #2c1810; font-weight: 600; }

    /* ── APPROVED BADGE CARD ── */
    .approved-card {
      background: linear-gradient(135deg, #fdf6ec, #fef9f0);
      border: 1px solid #e6d8c0;
      border-radius: 16px;
      padding: 28px 24px;
      margin: 22px 0;
    }
    .status-pill {
      display: inline-block;
      background: linear-gradient(145deg, #c9a96e, #b8854a);
      color: #ffffff;
      padding: 7px 24px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .approved-card .guest-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 26px;
      font-weight: 700;
      color: #2c1810;
      margin-bottom: 6px;
    }
    .approved-card .event-name {
      font-size: 14px;
      color: #9a8878;
      letter-spacing: 1px;
    }

    /* ── DETAILS GRID ── */
    .details-grid {
      display: table;
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 22px 0;
      border: 1px solid #e6d8c0;
      border-radius: 14px;
      overflow: hidden;
    }
    .details-row {
      display: table-row;
    }
    .details-row:not(:last-child) .detail-cell {
      border-bottom: 1px solid #ede5d8;
    }
    .detail-cell {
      display: table-cell;
      padding: 14px 18px;
      font-size: 14px;
      vertical-align: middle;
    }
    .detail-cell.label {
      font-weight: 700;
      color: #8a7568;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      background: #fdf8f2;
      width: 38%;
      border-right: 1px solid #ede5d8;
    }
    .detail-cell.value {
      color: #2c1810;
      font-weight: 500;
      background: #ffffff;
    }

    /* ── QR CODE SECTION ── */
    .qr-section {
      background: linear-gradient(135deg, #fdf6ec, #fef9f0);
      border: 1px solid #e6d8c0;
      border-radius: 16px;
      padding: 32px 24px;
      margin: 24px 0;
      text-align: center;
    }
    .qr-section .qr-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 4px;
      color: #b8935a;
      margin-bottom: 8px;
    }
    .qr-section h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20px;
      color: #2c1810;
      margin-bottom: 6px;
      font-weight: 700;
    }
    .qr-section p {
      font-size: 13px;
      color: #9a8878;
      margin-bottom: 22px;
    }
    .qr-frame {
      display: inline-block;
      padding: 14px;
      background: #ffffff;
      border: 1px solid #e6d8c0;
      border-radius: 14px;
      box-shadow: 0 6px 20px rgba(201,169,110,0.15);
    }
    .qr-frame img {
      width: 200px;
      height: 200px;
      display: block;
      border-radius: 6px;
    }
    .qr-fallback {
      margin-top: 18px;
      font-size: 12px;
      color: #b8935a;
    }
    .qr-fallback a {
      color: #b8935a;
      word-break: break-all;
    }

    /* ── NEXT STEPS ── */
    .steps-box {
      background: #fdf8f2;
      border: 1px solid #e8dcc8;
      border-radius: 16px;
      padding: 28px 24px;
      margin: 24px 0;
      text-align: left;
    }
    .steps-box h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 18px;
      color: #2c1810;
      margin-bottom: 22px;
      text-align: center;
    }
    .step {
      display: flex;
      align-items: flex-start;
      margin-bottom: 18px;
    }
    .step:last-child { margin-bottom: 0; }
    .step-num {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: linear-gradient(145deg, #c9a96e, #b8854a);
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-right: 14px;
      margin-top: 2px;
    }
    .step-body .step-title {
      font-size: 14px;
      font-weight: 700;
      color: #2c1810;
      margin-bottom: 3px;
    }
    .step-body .step-desc {
      font-size: 13px;
      color: #8a7568;
      line-height: 1.55;
    }

    .script-close {
      font-family: 'Great Vibes', cursive;
      font-size: 30px;
      color: #c9a96e;
      margin: 26px 0 8px;
    }

    /* ── FOOTER ── */
    .footer {
      background: linear-gradient(180deg, #fdf6ec, #f5ede0);
      border-top: 1px solid #e6d8c0;
      padding: 28px 30px;
      text-align: center;
    }
    .footer .couple {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 17px;
      color: #7a6a5a;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .footer .hearts {
      color: #c9a96e;
      font-size: 16px;
      letter-spacing: 10px;
      margin-bottom: 12px;
    }
    .footer p { font-size: 12px; color: #a09080; line-height: 1.7; }

    @media only screen and (max-width: 600px) {
      .wrapper { margin: 0 !important; border-radius: 0 !important; }
      .hero { height: 200px !important; }
      .hero-text h1 { font-size: 32px !important; }
      .content { padding: 10px 22px 32px !important; }
      .approved-card .guest-name { font-size: 22px !important; }
      .qr-frame img { width: 160px !important; height: 160px !important; }
      .detail-cell { padding: 12px 14px !important; font-size: 13px !important; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Hero Image -->
    <div class="hero">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=620&h=260&fit=crop&crop=center"
        alt="Wedding"
      />
      <div class="hero-overlay"></div>
      <div class="hero-text">
        <span class="script">Your presence is requested</span>
        <h1>You're Approved!</h1>
      </div>
    </div>

    <div class="ornament">✦ ✦ ✦</div>

    <div class="content">
      <p>Dearest <strong>${rsvp?.name || "Guest"}</strong>,</p>
      <p>Wonderful news — your attendance has been officially confirmed! We are absolutely delighted to have you join us for this special celebration.</p>

      <!-- Approved Badge Card -->
      <div class="approved-card">
        <div class="status-pill">✓ &nbsp; Approved</div>
        <div class="guest-name">${rsvp?.name || "Guest"}</div>
        <div class="event-name">Your entry is confirmed for this event</div>
      </div>

      <!-- Guest Details -->
      <div class="details-grid">
        <div class="details-row">
          <div class="detail-cell label">Status</div>
          <div class="detail-cell value" style="color: #2d6a4f; font-weight: 700;">✓ Confirmed</div>
        </div>
        ${
          rsvp?.numberOfGuests
            ? `
        <div class="details-row">
          <div class="detail-cell label">Guests</div>
          <div class="detail-cell value">${rsvp.numberOfGuests} ${rsvp.numberOfGuests === 1 ? "person" : "people"}</div>
        </div>`
            : ""
        }
        ${
          rsvp?.dietaryRequirements
            ? `
        <div class="details-row">
          <div class="detail-cell label">Dietary</div>
          <div class="detail-cell value">${rsvp.dietaryRequirements}</div>
        </div>`
            : ""
        }
        ${
          rsvp?.email
            ? `
        <div class="details-row">
          <div class="detail-cell label">Email</div>
          <div class="detail-cell value">${rsvp.email}</div>
        </div>`
            : ""
        }
      </div>

      <div class="gold-line"></div>

      <!-- QR Code Section -->
      ${
        qrCodeImage
          ? `
      <div class="qr-section">
        <div class="qr-label">Your Entry Pass</div>
        <h3>Scan at the Venue</h3>
        <p>Present this QR code at the entrance for seamless check-in on the day</p>
        <div class="qr-frame">
          <img
            src="${qrCodeImage}"
            alt="Entry QR Code"
            width="200"
            height="200"
          />
        </div>
        ${
          checkinUrl
            ? `
        <div class="qr-fallback">
          If the QR code doesn't display, use this link:<br>
          <a href__="${checkinUrl}">${checkinUrl}</a>
        </div>`
            : ""
        }
      </div>`
          : ""
      }

      <!-- Next Steps -->
      <div class="steps-box">
        <h3>What to Expect</h3>
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">Save Your QR Code</div>
            <div class="step-desc">Screenshot or download your QR code above and keep it handy — you'll need it for entry at the venue.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">Event Details Coming Soon</div>
            <div class="step-desc">A full event guide with venue address, schedule, parking, and dress code will be sent closer to the date.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">Arrive & Celebrate</div>
            <div class="step-desc">Simply present your QR code at the entrance and our team will check you in instantly.</div>
          </div>
        </div>
      </div>

      <p>We truly cannot wait to celebrate this beautiful day with you!</p>

      <div class="script-close">With all our love</div>
    </div>

    <div class="footer">
      <div class="couple">Deborah &amp; Iyanu</div>
      <div class="hearts">♡ &nbsp; ♡ &nbsp; ♡</div>
      <p>
        This approval was sent from the official wedding platform.<br>
        &copy; ${new Date().getFullYear()} TechTones &mdash; All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
  `;
};
