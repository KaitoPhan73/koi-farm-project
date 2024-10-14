// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Guest", "Customer", "Staff", "Manager"],
      default: "Guest",
    },
    address: String,
    phoneNumber: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
