const express = require("express");
const { teachersignup } = require("../controllers/teacher");
const router = express.Router();

router.route("/signup").post(teachersignup);

module.exports = router;
