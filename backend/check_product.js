const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./Models/Product');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const productIdRaw = "69dca24aa5a9550c08c86ee4";
    const product = await Product.findById(productIdRaw);
    console.log("Product found by _id:", product ? "YES" : "NO");
    
    if (!product) {
       const allProducts = await Product.find({}).limit(5);
       console.log("Sample products in DB:", JSON.stringify(allProducts.map(p => ({_id: p._id, id: p.id, title: p.title})), null, 2));
    }
    process.exit(0);
}
check();
