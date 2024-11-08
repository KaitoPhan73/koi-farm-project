const userService = require('../services/userService');

class UserController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: 'Name, email, and password are required' });
      }

      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error creating user: ${error.message}` });
    }
  }

  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const result = await userService.getUsers(page, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error fetching users: ${error.message}`,
      });
    }
  }

  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user || {});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error fetching user by ID: ${error.message}`,
      });
    }
  }

  async update(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser)
        return res.status(404).json({ message: 'User not found' });
      res.status(200).json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error updating user: ${error.message}` });
    }
  }

  async delete(req, res) {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error deleting user: ${error.message}` });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate required fields
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status is required',
        });
      }

      // Validate status values
      const validStatuses = ['Active', 'Inactive', 'Banned'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Status must be Active, Inactive, or Banned',
        });
      }

      const result = await userService.updateStatus(id, status);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error updating user status: ${error.message}`,
      });
    }
  }
}

module.exports = new UserController();
