const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('./Models/Order');
const Product = require('./Models/Product');

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for migration...');

        const orders = await Order.find({});
        console.log(`Found ${orders.length} orders to inspect.`);

        let updatedCount = 0;

        for (const order of orders) {
            let orderChanged = false;

            for (let i = 0; i < order.items.length; i++) {
                const item = order.items[i];
                
                // If it's already a numeric ID (as a string or number), it might be fine, 
                // but let's check if it's currently a 24-char hex string (ObjectId)
                const isObjectId = /^[0-9a-fA-F]{24}$/.test(item.productId);

                if (isObjectId) {
                    // It's likely an old ObjectId from a previous seed.
                    // Try to find the product by title to get its current ID.
                    const product = await Product.findOne({ title: item.title });
                    
                    if (product) {
                        console.log(`Updating order item: "${item.title}" from ID ${item.productId} to ${product.id}`);
                        order.items[i].productId = String(product.id);
                        orderChanged = true;
                    } else {
                        console.warn(`Could not find product with title "${item.title}" to repair ID.`);
                    }
                }
            }

            if (orderChanged) {
                await order.save();
                updatedCount++;
            }
        }

        console.log(`Successfully updated ${updatedCount} orders.`);
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
