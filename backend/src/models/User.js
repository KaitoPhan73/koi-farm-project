const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['Customer', 'Staff', 'Manager'],
      default: 'Customer',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Banned'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

// Middleware để mã hóa mật khẩu trước khi lưu
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
