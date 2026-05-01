const rsvpInviteTemplate = ({ name, eventTitle, rsvpLink }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Invited</title>
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

    /* ── HERO IMAGE ── */
    .hero {
      position: relative;
      height: 300px;
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
      background: linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(30,15,5,0.55) 100%);
    }
    .hero-text {
      position: absolute;
      bottom: 30px;
      left: 0;
      right: 0;
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
      letter-spacing: 1px;
    }
    .hero-text h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 44px;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: 1px;
      text-shadow: 0 2px 12px rgba(0,0,0,0.3);
    }

    /* ── DIVIDER ── */
    .ornament {
      text-align: center;
      padding: 22px 0 8px;
      font-size: 20px;
      color: #c9a96e;
      letter-spacing: 10px;
    }
    .gold-line {
      width: 90px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #c9a96e, transparent);
      margin: 12px auto 22px;
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

    /* ── EVENT CARD ── */
    .event-card {
      background: linear-gradient(135deg, #fdf6ec, #fef9f0);
      border: 1px solid #e6d8c0;
      border-radius: 16px;
      padding: 28px 24px;
      margin: 26px 0;
    }
    .event-card .label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 4px;
      color: #b8935a;
      margin-bottom: 10px;
    }
    .event-card .title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      font-weight: 700;
      color: #2c1810;
      line-height: 1.3;
    }
    .event-card .divider-dot {
      color: #c9a96e;
      margin: 12px 0 0;
      font-size: 18px;
    }

    /* ── INLINE PHOTO ── */
    .inline-photo {
      width: 100%;
      height: 190px;
      object-fit: cover;
      border-radius: 14px;
      margin: 22px 0;
      display: block;
    }

    /* ── BUTTON ── */
    .btn-wrap { text-align: center; margin: 30px 0 36px; }
    .btn {
      display: inline-block;
      padding: 16px 52px;
      background: linear-gradient(145deg, #c9a96e, #b8854a);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 50px;
      font-family: 'Inter', Arial, sans-serif;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 3px;
      text-transform: uppercase;
      box-shadow: 0 10px 30px rgba(184,133,74,0.40);
    }

    .script-close {
      font-family: 'Great Vibes', cursive;
      font-size: 30px;
      color: #c9a96e;
      margin: 24px 0 8px;
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
    .footer .hearts { color: #c9a96e; font-size: 16px; letter-spacing: 10px; margin-bottom: 12px; }
    .footer p { font-size: 12px; color: #a09080; line-height: 1.7; }

    @media only screen and (max-width: 600px) {
      .wrapper { margin: 0 !important; border-radius: 0 !important; }
      .hero { height: 230px !important; }
      .hero-text h1 { font-size: 34px !important; }
      .content { padding: 10px 22px 32px !important; }
      .btn { padding: 14px 36px !important; font-size: 12px !important; }
      .event-card .title { font-size: 20px !important; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <div class="hero">
      <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=620&h=300&fit=crop&crop=center" alt="Wedding" />
      <div class="hero-overlay"></div>
      <div class="hero-text">
        <span class="script">Together with their families</span>
        <h1>You're Invited</h1>
      </div>
    </div>

    <div class="ornament">✦ ✦ ✦</div>

    <div class="content">
      <p>Dearest <strong>${name}</strong>,</p>
      <p>With joyful hearts, we joyfully request the honour of your presence at the wedding celebration of</p>

      <div class="event-card">
        <div class="label">The Wedding of</div>
        <div class="title">${eventTitle}</div>
        <div class="divider-dot">✦</div>
      </div>

      <img
        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=560&h=190&fit=crop&crop=center"
        alt="Wedding rings and flowers"
        class="inline-photo"
      />

      <div class="gold-line"></div>

      <p>Your presence would be our greatest blessing as we begin this beautiful new chapter together. We would be truly honoured to share this unforgettable day with you.</p>

      <p style="font-size: 14px; color: #9a8878;">Kindly confirm your attendance by clicking the button below.</p>

      <div class="btn-wrap">
        <a href__="${rsvpLink}" class="btn">Confirm Attendance</a>
      </div>

      <div class="script-close">With all our love</div>
    </div>

    <div class="footer">
      <div class="couple">Deborah &amp; Iyanu</div>
      <div class="hearts">♡ &nbsp; ♡ &nbsp; ♡</div>
      <p>
        This invitation was sent from the official wedding platform.<br>
        &copy; ${new Date().getFullYear()} TechTones &mdash; All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
  `;
};

const rsvpConfirmationTemplate = ({ name, eventTitle }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSVP Confirmed</title>
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
      border: 1px solid #d8ede0;
    }

    /* ── HERO BANNER ── */
    .hero-banner {
      background: linear-gradient(145deg, #1a4731, #2d6a4f, #40916c);
      padding: 50px 30px;
      text-align: center;
      color: #ffffff;
      position: relative;
      overflow: hidden;
    }
    .hero-banner::after {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 220px; height: 220px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
    }
    .hero-banner::before {
      content: '';
      position: absolute;
      bottom: -40px; left: -40px;
      width: 160px; height: 160px;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
    }
    .check-ring {
      width: 74px;
      height: 74px;
      border: 2px solid rgba(255,255,255,0.55);
      border-radius: 50%;
      display: block;
      margin: 0 auto 18px;
      line-height: 74px;
      text-align: center;
      font-size: 34px;
      position: relative;
    }
    .hero-banner h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 38px;
      font-weight: 800;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .hero-banner .sub {
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 3px;
      text-transform: uppercase;
      opacity: 0.85;
    }

    /* ── DIVIDER ── */
    .ornament {
      text-align: center;
      padding: 20px 0 6px;
      font-size: 18px;
      color: #40916c;
      letter-spacing: 10px;
    }
    .green-line {
      width: 90px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #40916c, transparent);
      margin: 10px auto 20px;
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
    .content strong { color: #1a3d2a; font-weight: 600; }

    /* ── CONFIRMED CARD ── */
    .confirmed-card {
      background: linear-gradient(135deg, #e8f5ee, #f1faf4);
      border: 1px solid #b8dfc8;
      border-radius: 16px;
      padding: 28px 24px;
      margin: 22px 0;
    }
    .status-pill {
      display: inline-block;
      background: linear-gradient(145deg, #2d6a4f, #40916c);
      color: #ffffff;
      padding: 6px 22px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .confirmed-card .event-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
      font-weight: 700;
      color: #1a4731;
      margin-bottom: 6px;
    }
    .confirmed-card .note {
      font-size: 13px;
      color: #5a8a6a;
    }

    /* ── INLINE PHOTO ── */
    .inline-photo {
      width: 100%;
      height: 185px;
      object-fit: cover;
      border-radius: 14px;
      margin: 22px 0;
      display: block;
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
      color: #40916c;
      margin: 26px 0 8px;
    }

    /* ── FOOTER ── */
    .footer {
      background: linear-gradient(180deg, #f1faf4, #e8f5ee);
      border-top: 1px solid #b8dfc8;
      padding: 28px 30px;
      text-align: center;
    }
    .footer .couple {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 17px;
      color: #2d6a4f;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .footer .hearts { color: #40916c; font-size: 16px; letter-spacing: 10px; margin-bottom: 12px; }
    .footer p { font-size: 12px; color: #7a9a84; line-height: 1.7; }

    @media only screen and (max-width: 600px) {
      .wrapper { margin: 0 !important; border-radius: 0 !important; }
      .hero-banner { padding: 36px 20px !important; }
      .hero-banner h1 { font-size: 30px !important; }
      .content { padding: 10px 22px 32px !important; }
      .confirmed-card .event-title { font-size: 18px !important; }
      .check-ring { width: 58px !important; height: 58px !important; font-size: 26px !important; line-height: 58px !important; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <div class="hero-banner">
      <div class="check-ring">✓</div>
      <h1>You're Confirmed!</h1>
      <p class="sub">Your RSVP has been received</p>
    </div>

    <div class="ornament">✦ ✦ ✦</div>

    <div class="content">
      <p>Dearest <strong>${name}</strong>,</p>
      <p>We are absolutely overjoyed that you will be joining us to celebrate! Your confirmation truly fills our hearts with happiness.</p>

      <div class="confirmed-card">
        <div class="status-pill">✓ &nbsp; Confirmed</div>
        <div class="event-title">${eventTitle}</div>
        <div class="note">Your attendance is officially on record</div>
      </div>

      <img
        src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=560&h=185&fit=crop&crop=center"
        alt="Wedding celebration"
        class="inline-photo"
      />

      <div class="green-line"></div>

      <div class="steps-box">
        <h3>What Happens Next</h3>
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">Full Event Details</div>
            <div class="step-desc">A complete event guide — venue address, schedule, and dress code — will be emailed to you closer to the date.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">Your Digital Pass</div>
            <div class="step-desc">A personalised digital entry pass will be sent for seamless check-in at the venue on the day.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">Stay Updated</div>
            <div class="step-desc">Watch your inbox for exciting updates, travel tips, gift registry details, and more.</div>
          </div>
        </div>
      </div>

      <p>We truly cannot wait to share this beautiful celebration with you!</p>

      <div class="script-close">See you at the celebration!</div>
    </div>

    <div class="footer">
      <div class="couple">Deborah &amp; Iyanu</div>
      <div class="hearts">♡ &nbsp; ♡ &nbsp; ♡</div>
      <p>
        This confirmation was sent from the official wedding platform.<br>
        &copy; ${new Date().getFullYear()} TechTones &mdash; All rights reserved.
      </p>
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
