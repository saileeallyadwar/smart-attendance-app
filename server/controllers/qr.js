const asyncWrap = require("../utils/asyncWrap");
const ExpressError = require("../utils/ExpressError");

exports.qrgen = async (req, res) => {
  try {
    const { teacherId } = req.body; // Assuming teacherId helps in identifying unique attendance URLs

    // Construct the URL for the QR code (redirects to a dynamic attendance page)
    const qrCodeURL = `https://forms.gle/wAEFj7L5wmR476cq8`;

    res.status(200).json({ qrCodeURL });
  } catch (error) {
    res
      .status(500)
      .json({ message: "QR code generation failed", error: error.message });
  }
};
