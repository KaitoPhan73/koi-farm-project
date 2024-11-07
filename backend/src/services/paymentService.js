const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');

exports.createPaymentIntent = async (amount, currency) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        });

        const payment = await Payment.create({
            amount,
            currency,
            status: paymentIntent.status,
        });

        return payment;
    } catch (error) {
        throw new Error(error.message);
    }
};
