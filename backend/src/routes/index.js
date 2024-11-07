// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const consignmentRoutes = require('./consignmentRoutes');
const orderRoutes = require('./orderRoutes');
const orderItemRoutes = require('./orderItemRoutes');
const feedBackRoutes = require('./feedbackRoutes');
const categoryRoutes = require('./categoryRoutes');
const authRoutes = require('./authRoutes');
const productBaseRoutes = require('./productBaseRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/feedbacks', feedBackRoutes);
router.use('/consignments', consignmentRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoryRoutes);
router.use('/order-items', orderItemRoutes);
router.use('/auth', authRoutes);
router.use('/product-bases', productBaseRoutes);

module.exports = router;
