const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('./Models/Order');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const order = await Order.findOne().sort({ createdAt: -1 });
    console.log(JSON.stringify(order, null, 2));
    process.exit(0);
}
check();
