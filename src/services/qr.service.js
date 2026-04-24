const QRCode = require("qrcode");
const { uploadToCloudinary } = require("./cloudinary.service"); // your existing service

/**
 * Generate QR Code and upload to Cloudinary
 * @param {string} checkinUrl - The URL the QR should point to
 * @param {string} eventSlug - For organizing folders (e.g. weddings/wedding-slug/qr/)
 * @returns {Promise<string>} Cloudinary secure_url
 */
const generateAndUploadQR = async (checkinUrl, eventSlug = "default") => {
  try {
    // 1. Generate QR as base64 data URL
    const qrDataUrl = await QRCode.toDataURL(checkinUrl, {
      width: 300, // better quality for printing/scanning
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    // 2. Upload to Cloudinary
    // Cloudinary accepts data: URLs directly
    const result = await uploadToCloudinary(
      qrDataUrl,
      `weddings/${eventSlug}/qr`,
    );

    return result.secure_url; // This is what we want for emails
  } catch (err) {
    console.error("QR Generation + Upload failed:", err);
    throw new Error("Failed to generate QR code");
  }
};

module.exports = { generateAndUploadQR };
