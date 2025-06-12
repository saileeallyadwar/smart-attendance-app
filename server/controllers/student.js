const asyncWrap = require("../utils/asyncWrap");
const ExpressError = require("../utils/ExpressError");
const Student = require("../models/student");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Student Signup
exports.studentsignup = asyncWrap(async (req, res, next) => {
  const { email, regno, name, password } = req.body;

  if (!email || !regno || !name || !password) {
    return next(new ExpressError("Please enter all the fields", 400));
  }

  const found = await Student.findOne({ email });
  if (found) {
    return next(new ExpressError("The user is already registered", 400));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new student instance with the hashed password
  const newStudent = new Student({
    ...req.body,
    password: hashedPassword,
  });
  await newStudent.save();

  const token = jwt.sign(
    { userId: newStudent._id, role: "student" },
    process.env.SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Signup successful",
    user: newStudent,
  });
});

exports.studentLogin = asyncWrap(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ExpressError("Please enter all the fields", 400));
  }

  const student = await Student.findOne({ email });
  if (!student) {
    return next(new ExpressError("Student not found", 404));
  }

  const isPasswordCorrect = await bcrypt.compare(password, student.password);
  if (!isPasswordCorrect) {
    return next(new ExpressError("Invalid password", 401));
  }

  const token = jwt.sign(
    { userId: student._id, role: "student" },
    process.env.SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    user: student,
  });
});
