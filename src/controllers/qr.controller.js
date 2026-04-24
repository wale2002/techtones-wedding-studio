const { generateAndUploadQR } = require("../services/qr.service");

exports.getQr = async (req, res) => {
  try {
    const qr = await generateQR(req.params.slug);
    res.json({
      success: true,
      qr,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "QR generation failed",
    });
  }
};
