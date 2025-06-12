const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { stderr } = require("process");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowecase: true,
  },
  enrolledClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  regno: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "student",
  },
});

StudentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

StudentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Student", StudentSchema);
