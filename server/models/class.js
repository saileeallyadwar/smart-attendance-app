const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  qrCode: { type: String }, // Store QR code data or URL
  attendance: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
