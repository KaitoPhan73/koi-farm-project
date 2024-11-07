const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authorize } = require('../middlewares/authorize');
const { body } = require('express-validator');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 */
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login
);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 */
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('fullName')
      .isLength({ min: 3 })
      .withMessage('Full name must be at least 3 characters long'),
    body('phone')
      .optional()
      .isMobilePhone()
      .withMessage('Valid phone number is required'),
    body('address')
      .optional()
      .notEmpty()
      .withMessage('Address cannot be empty if provided'),
    body('role')
      .optional()
      .isIn(['Customer', 'Admin'])
      .withMessage('Invalid role specified'),
  ],
  authController.register
);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 */
/*
router.get('/profile', authorize(), authController.getProfile);

router.put(
  '/profile',
  authorize(),
  [
    body('fullName')
      .optional()
      .isLength({ min: 3 })
      .withMessage('Full name must be at least 3 characters long'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('phone')
      .optional()
      .isMobilePhone()
      .withMessage('Valid phone number is required'),
    body('address')
      .optional()
      .notEmpty()
      .withMessage('Address cannot be empty if provided'),
  ],
  authController.updateProfile
);
*/

/**
 * @swagger
 * /auth/admin:
 *   get:
 *     summary: Admin only route
 *     security:
 *       - bearerAuth: []
 */
router.get('/admin', authorize('Admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Welcome Admin',
    user: req.user,
  });
});

module.exports = router;
