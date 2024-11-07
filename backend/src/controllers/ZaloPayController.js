const ZaloPayService = require('../services/ZaloPayService');
const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
    const { amount, description, currency } = req.body; 
    try {
        const zaloPayResponse = await ZaloPayService.createOrder(amount, description);
        
        const newPayment = await Payment.create({
            amount,
            orderId: zaloPayResponse.app_trans_id,
            status: 'pending',
            clientSecret: zaloPayResponse.CLIENT_SECRET || '',
            currency: currency, 
        });

        res.json({ zaloPayUrl: zaloPayResponse.order_url, payment: newPayment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
};

exports.handleCallback = async (req, res) => {
    const { data, mac } = req.body;
    const key2 = process.env.ZALO_KEY2;
    const generatedMac = crypto.createHmac('sha256', key2).update(data).digest('hex');

    if (generatedMac === mac) {
        const transaction = JSON.parse(data);
        
        await Payment.findOneAndUpdate(
            { orderId: transaction.app_trans_id },
            { status: transaction.status === 1 ? 'success' : 'failed' }
        );
        
        res.json({ message: 'Callback handled successfully' });
    } else {
        res.status(400).json({ message: 'Invalid mac' });
    }
};
