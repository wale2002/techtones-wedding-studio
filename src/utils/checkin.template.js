const checkinPageTemplate = (data) => {
  const {
    name,
    email,
    attending,
    totalGuests,
    guestGroup,
    notes,
    checkedIn,
    eventTitle,
  } = data;

  const statusColor = checkedIn ? "#16a34a" : "#d97706";
  const statusBg = checkedIn ? "#f0fdf4" : "#fffbeb";
  const statusText = checkedIn ? "✅ Checked In" : "⏳ Not Yet Checked In";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Check-In · ${eventTitle || "Wedding"}</title>
  <link href__="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', sans-serif;
      background: #faf9f7;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .card {
      background: #fff;
      border-radius: 24px;
      max-width: 480px;
      width: 100%;
      overflow: hidden;
      box-shadow: 0 4px 40px rgba(0,0,0,0.08);
    }

    .card-header {
      background: linear-gradient(135deg, #1c1917 0%, #44403c 100%);
      padding: 48px 32px 40px;
      text-align: center;
      color: #fff;
    }

    .avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 28px;
    }

    .event-label {
      font-size: 11px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
      margin-bottom: 8px;
    }

    .event-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px;
      font-weight: 500;
      color: #fff;
    }

    .card-body {
      padding: 32px;
    }

    .guest-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 36px;
      font-weight: 600;
      text-align: center;
      color: #1c1917;
      margin-bottom: 8px;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      background: ${statusBg};
      color: ${statusColor};
      border: 1px solid ${statusColor}33;
      margin: 0 auto 28px;
      display: flex;
      justify-content: center;
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
    }

    .divider {
      height: 1px;
      background: #f5f5f4;
      margin: 24px 0;
    }

    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    }

    .detail-item {
      background: #faf9f7;
      border-radius: 14px;
      padding: 16px;
    }

    .detail-item.full {
      grid-column: 1 / -1;
    }

    .detail-label {
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #a8a29e;
      margin-bottom: 4px;
    }

    .detail-value {
      font-size: 14px;
      font-weight: 500;
      color: #1c1917;
      word-break: break-word;
    }

    .attending-yes {
      color: #16a34a;
    }

    .attending-no {
      color: #dc2626;
    }

    .footer-note {
      text-align: center;
      font-size: 12px;
      color: #a8a29e;
      margin-top: 24px;
      letter-spacing: 0.05em;
    }

    @media (max-width: 400px) {
      .details-grid { grid-template-columns: 1fr; }
      .detail-item.full { grid-column: 1; }
      .guest-name { font-size: 28px; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <div class="avatar">💍</div>
      <p class="event-label">Event</p>
      <h1 class="event-title">${eventTitle || "Wedding Celebration"}</h1>
    </div>

    <div class="card-body">
      <h2 class="guest-name">${name}</h2>

      <div class="status-badge">${statusText}</div>

      <div class="divider"></div>

      <div class="details-grid">
        ${
          email
            ? `
        <div class="detail-item">
          <p class="detail-label">📧 Email</p>
          <p class="detail-value">${email}</p>
        </div>`
            : ""
        }

        <div class="detail-item">
          <p class="detail-label">👥 Attending</p>
          <p class="detail-value ${attending ? "attending-yes" : "attending-no"}">
            ${attending ? "Yes, Attending" : "Not Attending"}
          </p>
        </div>

        ${
          totalGuests
            ? `
        <div class="detail-item">
          <p class="detail-label">🎟 Total Guests</p>
          <p class="detail-value">${totalGuests} person${totalGuests > 1 ? "s" : ""}</p>
        </div>`
            : ""
        }

        ${
          guestGroup
            ? `
        <div class="detail-item">
          <p class="detail-label">🏷 Group</p>
          <p class="detail-value">${guestGroup}</p>
        </div>`
            : ""
        }

        ${
          notes
            ? `
        <div class="detail-item full">
          <p class="detail-label">📝 Notes</p>
          <p class="detail-value">${notes}</p>
        </div>`
            : ""
        }
      </div>

      <p class="footer-note">Scan verified · ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
    </div>
  </div>
</body>
</html>`;
};

module.exports = checkinPageTemplate;
