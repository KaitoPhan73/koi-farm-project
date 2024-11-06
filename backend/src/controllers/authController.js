const authService = require('../services/authService');
const { validationResult } = require('express-validator');

class AuthController {
  // Hàm xử lý yêu cầu đăng nhập
  async login(req, res) {
    // check lỗi xác thực
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const { token, user } = await authService.login(username, password);

      const { password: _, ...responseUser } = user.toObject();

      res.json({ token, user: responseUser });
    } catch (error) {
      console.error('Login error:', error);  // Logging error
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userData = req.body;

    try {
      const newUser = await authService.register(userData);

      const { password, role, ...responseUser } = newUser.toObject();

      res.status(201).json(responseUser);
    } catch (error) {
      console.error('Register error:', error);  // Logging error
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async resetPassword(req, res) {
    // Kiểm tra lỗi xác thực
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, newPassword } = req.body;

    try {
      await authService.resetPassword(username, newPassword);

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Reset password error:', error);  // Logging error
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new AuthController();
