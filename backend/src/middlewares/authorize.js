// middleware/authorize.js

const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

// Middleware kiểm tra phân quyền
const authorize = (roles = []) => {
  return (req, res, next) => {
    // Lấy token từ header
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: 'Failed to authenticate token' });
      }

      // Kiểm tra vai trò
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Gán thông tin người dùng vào request
      req.user = decoded;
      next();
    });
  };
};

module.exports = authorize;
