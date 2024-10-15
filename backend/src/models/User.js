const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    koiSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Koi" }], // Danh sách cá Koi ký gửi
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Lịch sử đơn hàng
    role: {
      type: String,
      enum: ["Customer", "Staff", "Manager", "Admin"],
      default: "Customer",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Banned"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
