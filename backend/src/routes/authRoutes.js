// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authorize = require('../middlewares/authorize');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/reset-password', authController.resetPassword);

router.get('/customer', authorize(['Customer', 'Admin']), (req, res) => {
  res.json({ message: 'Welcome Staff or Admin' });
});

module.exports = router;
