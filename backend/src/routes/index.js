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
const stripePaymentRoutes = require('./paymentRoutes');
const zaloPayRoutes = require('./zaloPayRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/feedbacks', feedBackRoutes);
router.use('/consignments', consignmentRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoryRoutes);
router.use('/order-items', orderItemRoutes);
router.use('/auth', authRoutes);
router.use('/stripe', stripePaymentRoutes);
router.use('/zalo-pay', zaloPayRoutes);


module.exports = router;
