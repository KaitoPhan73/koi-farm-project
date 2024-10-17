// services/authService.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
class AuthService {
  // Hàm đăng nhập
  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: '1h',
    });
    return { token, user };
  }

  // Hàm đăng ký
  async register(data) {
    const { username, fullName, email, phone, address, password } = data;

    // Kiểm tra xem username có tồn tại không
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const newUser = new User({
      username,
      fullName,
      email,
      phone,
      address,
      password, // Mật khẩu sẽ được mã hóa bởi middleware trong schema
    });

    await newUser.save();
    return newUser;
  }

  // Hàm đặt lại mật khẩu
  async resetPassword(username, newPassword) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    user.password = newPassword; // Mật khẩu mới sẽ được mã hóa bởi middleware trong schema
    await user.save();
    return user;
  }
}

module.exports = new AuthService();
