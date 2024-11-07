const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Make sure to install bcryptjs for hashing the password

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
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
  
      // Nếu có mật khẩu mới, băm mật khẩu mới trước khi lưu vào cơ sở dữ liệu
      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
      }
  
      // Cập nhật thông tin người dùng
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      if (!updatedUser) {
        throw new Error('Failed to update user');
      }
  
      return updatedUser;
    } catch (err) {
      throw new Error(err.message || 'Error updating user');
    }
  }
    

// async updateUser(id, data) {
//   try {
//     const updateData = { ...data };
//     if (data.password) {
//       delete updateData.password; // Handle password update separately if needed
//     }

//     const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
//     if (!updatedUser) {
//       throw new Error('User not found');
//     }
//     return updatedUser;
//   } catch (err) {
//     throw new Error('Error updating user');
//   }
// }


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
