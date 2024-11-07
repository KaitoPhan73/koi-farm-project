const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authorize = require('../middlewares/authorize');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication routes
 */

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
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Unprocessable Entity - Invalid input
 *       500:
 *         description: Internal server error
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
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessable Entity - Invalid input
 *       500:
 *         description: Internal server error
 */
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('fullName')
      .isLength({ min: 3 })
      .withMessage('Full name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').isMobilePhone().withMessage('Valid phone number is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  authController.register
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
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
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Unprocessable Entity - Invalid input
 *       500:
 *         description: Internal server error
 */
router.post(
  '/reset-password',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  authController.resetPassword
);

/**
 * @swagger
 * /auth/customer:
 *   get:
 *     summary: Access customer route
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome Customer or Admin
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.get('/customer', authorize(['Customer', 'Admin']), (req, res) => {
  res.json({ message: 'Welcome Customer or Admin' });
});

module.exports = router;
