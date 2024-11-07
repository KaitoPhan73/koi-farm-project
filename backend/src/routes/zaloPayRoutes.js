const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/ZaloPayController');

router.post('/create', PaymentController.createPayment);
router.post('/callback', PaymentController.handleCallback);

module.exports = router;
