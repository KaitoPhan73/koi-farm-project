const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    orderId: { type: String, required: true, unique: true }, 
    status: { type: String, required: true, enum: ['pending', 'success', 'failed'] }, 
    transactionId: { type: String },
    clientSecret: { type: String, required: true },
    currency: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('ZaloPay', paymentSchema);
