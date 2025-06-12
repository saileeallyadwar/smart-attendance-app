const express = require("express");
const { qrgen } = require("../controllers/qr.js");

const router = express.Router();

router.route("/generate-qr").post(qrgen);

module.exports = router;
