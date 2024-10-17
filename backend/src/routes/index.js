// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const consignmentRoutes = require('./consignmentRoutes');
const orderRoutes = require('./orderRoutes');
const orderItemRoutes = require('./orderItemRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/consignments', consignmentRoutes);
router.use('/orders', orderRoutes);
router.use('/order-items', orderItemRoutes);
router.use('/auth', authRoutes);

module.exports = router;
