// middleware/authorize.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = process.env.SECRET_KEY;

/**
 * Middleware kiểm tra xác thực và phân quyền
 * @param {string[]} roles - Mảng các vai trò được phép truy cập
 * @returns {Function} Middleware function
 */
const authorize = (roles = []) => {
  // Chuyển đổi role từ string sang array nếu cần
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return async (req, res, next) => {
    try {
      // Kiểm tra header Authorization
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: 'Authorization header is required and must be Bearer token',
        });
      }

      // Lấy và verify token
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, secretKey);

      // Kiểm tra loại token
      if (decoded.type === 'refresh') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token type',
        });
      }

      // Lấy thông tin user từ database
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      // Kiểm tra trạng thái user
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Your account is inactive',
        });
      }

      // Kiểm tra vai trò nếu được chỉ định
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${roles.join(' or ')}`,
        });
      }

      // Gán thông tin user vào request
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired',
        });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token',
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };
};

/**
 * Middleware kiểm tra quyền sở hữu resource
 * @param {string} resourceModel - Tên model của resource
 * @param {string} resourceIdParam - Tên parameter chứa ID của resource
 */
const checkOwnership = (resourceModel, resourceIdParam = 'id') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[resourceIdParam];

      // Kiểm tra định dạng ID
      if (!resourceId?.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid resource ID format',
        });
      }

      const Model = require(`../models/${resourceModel}`);
      const resource = await Model.findById(resourceId);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: `${resourceModel} not found`,
        });
      }

      // Kiểm tra quyền sở hữu (Admin hoặc chủ sở hữu)
      if (
        resource.userId?.toString() !== req.user._id.toString() &&
        req.user.role !== 'Admin'
      ) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to access this resource',
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };
};

module.exports = {
  authorize,
  checkOwnership,
};
