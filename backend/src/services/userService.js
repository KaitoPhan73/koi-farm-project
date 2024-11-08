const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Make sure to install bcryptjs for hashing the password

class UserService {
  async getUsers(page, limit) {
    try {
      if (page && limit) {
        const skip = (page - 1) * limit;

        const [users, totalItems] = await Promise.all([
          User.find()
            .select('-password')
            .skip(skip)
            .sort({ createdAt: -1 })
            .limit(limit),
          User.countDocuments(),
        ]);

        const totalPages = Math.ceil(totalItems / limit);

        return {
          success: true,
          items: users,
          totalPages,
          page: Number(page),
          limit: Number(limit),
        };
      }

      // Nếu không có phân trang thì trả về toàn bộ
      const users = await User.find()
        .select('-password')
        .sort({ createdAt: -1 });

      return {
        success: true,
        items: users,
      };
    } catch (error) {
      throw new Error(`Error getting users: ${error.message}`);
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

  async updateStatus(id, status) {
    try {
      // Validate status theo đúng enum trong model
      const validStatuses = ['Active', 'Inactive', 'Banned'];
      if (!validStatuses.includes(status)) {
        throw new Error(
          'Invalid status. Status must be Active, Inactive, or Banned'
        );
      }

      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      // Update status
      user.status = status;
      await user.save();

      return {
        success: true,
        message: 'User status updated successfully',
        data: user,
      };
    } catch (err) {
      throw new Error(err.message || 'Error updating user status');
    }
  }
}

module.exports = new UserService();
