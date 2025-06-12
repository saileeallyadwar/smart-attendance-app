require("dotenv").config();

const express = require("express");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const teacher = require("./routes/teacher");
const student = require("./routes/student");
const qr = require("./routes/qr");
const cors = require("cors");

const app = express();

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

main()
  .then(() => console.log("connextion to db established"))
  .catch((err) => console.log(err));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // React app URL
    credentials: true, // Enable credentials if you're using cookies
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/student", student);
app.use("/teacher", teacher);
app.use("/qr", qr);
// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ message: "An error occurred", error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`server is listening ${PORT}`));
