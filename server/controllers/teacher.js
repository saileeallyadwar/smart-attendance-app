const Teacher = require("../models/teacher");
const asyncWrap = require("../utils/asyncWrap");
const ExpressError = require("../utils/ExpressError");

const bcrypt = require("bcrypt");

exports.teachersignup = asyncWrap(async (req, res, next) => {
  const { email, employeeId, name, password } = req.body;

  if (!email || !employeeId || !name || !password) {
    return next(new ExpressError("Please enter all the fields", 400));
  }

  const found = await Teacher.findOne({ email });
  if (found) {
    return next(new ExpressError("The user is already registered", 400));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new teacher instance with the hashed password
  const newTeacher = new Teacher({
    ...req.body,
    password: hashedPassword,
  });
  await newTeacher.save();

  const token = jwt.sign(
    { userId: newTeacher._id, role: "teacher" },
    process.env.SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Signup successful",
    user: newTeacher,
  });
});
exports.teacherLogin = asyncWrap(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ExpressError("Please enter all the fields", 400));
  }

  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    return next(new ExpressError("Teacher not found", 404));
  }

  const isPasswordCorrect = await bcrypt.compare(password, teacher.password);
  if (!isPasswordCorrect) {
    return next(new ExpressError("Invalid password", 401));
  }

  const token = jwt.sign(
    { userId: teacher._id, role: "teacher" },
    process.env.SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    user: teacher,
  });
});
