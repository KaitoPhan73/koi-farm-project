const paymentService = require('../services/paymentService');

exports.createPayment = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const payment = await paymentService.createPaymentIntent(amount, currency);

        res.status(200).json({
            success: true,
            payment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
