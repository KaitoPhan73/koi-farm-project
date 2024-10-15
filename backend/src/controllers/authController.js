// controllers/authController.js
const authService = require("../services/authService");

class AuthController {
  // Hàm xử lý yêu cầu đăng nhập
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const { token, user } = await authService.login(username, password);
      res.json({ token, user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Hàm xử lý yêu cầu đăng ký
  async register(req, res) {
    const userData = req.body;

    try {
      // Gọi hàm đăng ký từ authService
      const newUser = await authService.register(userData);

      // Chuyển đổi đối tượng Mongoose sang object JS và loại bỏ trường password và role
      const { password, role, ...responseUser } = newUser.toObject();

      // Gửi phản hồi mà không có password và role
      res.status(201).json(responseUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Hàm xử lý yêu cầu đặt lại mật khẩu
  async resetPassword(req, res) {
    const { username, newPassword } = req.body;

    try {
      const updatedUser = await authService.resetPassword(
        username,
        newPassword
      );
      res.json({ message: "Password reset successfully", user: updatedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
