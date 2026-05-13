const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: String,
            title: String,
            price: Number,
            quantity: Number,
            image: String,
            brand: String
        }
    ],
    totalAmount: Number,
    status: {
        type: String,
        default: 'Order Placed'
    },
    address: {
        name: String,
        mobile: String,
        fullAddress: String,
        city: String,
        state: String,
        pincode: String
    },
    paymentMethod: {
        type: String,
        default: 'UPI'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
