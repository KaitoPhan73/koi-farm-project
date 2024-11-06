const User = require('../models/User');

class UserService {

  async getUsers() {
    try {
      return await User.find();
    } catch (err) {
      throw new Error('Error fetching users');
    } 
  }

  async getPagination(page = 1, limit = 10) {
    try {
      const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit);
      const total = await User.countDocuments();
      const hasNextPage = page * limit < total;
      const hasPrevPage = page > 1;
      return { users, total, page, limit, hasNextPage, hasPrevPage };
    } catch (err) {
      throw new Error('Error fetching paginated users');
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (err) {
      throw new Error('Error fetching user by ID');
    }
  }

  async updateUser(id, data) {
    try {
      const updateData = { ...data };
      if (data.password) {
        delete updateData.password; // Handle password update separately if needed
      }

      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (err) {
      throw new Error('Error updating user');
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (err) {
      throw new Error('Error deleting user');
    }
  }
}

module.exports = new UserService();
