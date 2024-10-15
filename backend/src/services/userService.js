// services/userService.js
const User = require("../models/User");

class UserService {
  async createUser(data) {
    const user = new User(data);
    return await user.save();
  }

  async getUsers() {
    return await User.find();
  }

  async getPagination(page = 1, limit = 10) {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await User.countDocuments();
    return { users, total, page, limit };
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserService();
