const Order = require('../Models/Order');

const createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, address, paymentMethod } = req.body;
        if (!userId || !items || !totalAmount || !address) {
            return res.status(400).json({ message: 'Missing required fields', success: false });
        }
        const newOrder = new Order({ userId, items, totalAmount, address, paymentMethod });
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order created', success: true, order: savedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'Cancelled' }, { new: true });
        res.status(200).json({ success: true, order: updatedOrder });
    } catch (err) {
        res.status(500).json({ success: false });
    }
};

module.exports = { createOrder, getUserOrders, cancelOrder };
