const express = require("express");
const Student = require("../models/student");

const jwt = require("jsonwebtoken");
const { studentsignup } = require("../controllers/student");

const router = express.Router();

router.route("/signup").post(studentsignup);

module.exports = router;
