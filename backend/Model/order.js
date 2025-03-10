const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            productName: { type: String, required: true },
            productPrice: { type: Number, required: true },
            productQuantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    Status:{type:String,default:'pending'},
    stripePaymentIntentId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
