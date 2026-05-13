/**
 * ShopEZ Production Migration Tool
 * --------------------------------
 * This script copies all products from your LOCAL MongoDB
 * to your PRODUCTION MongoDB Atlas cluster.
 */
const mongoose = require('mongoose');

// Configuration - User should ideally provide these via environment or CLI
const LOCAL_URI = 'mongodb://localhost:27017/shopez'; 
const ATLAS_URI = process.argv[2]; // Passed as argument

if (!ATLAS_URI) {
    console.log("Usage: node migrate_to_atlas.js <ATLAS_CONNECTION_STRING>");
    process.exit(1);
}

async function migrate() {
    try {
        console.log("🔌 Connecting to Local DB...");
        const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
        
        console.log("🔌 Connecting to Atlas DB...");
        const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();

        // Product Schema
        const productSchema = new mongoose.Schema({
            title: String,
            description: String,
            price: Number,
            category: String,
            image: String,
            images: [String],
            brand: String,
            rating: String,
            ratingCount: String,
            originalPrice: String,
            gender: String
        }, { strict: false });

        const LocalProduct = localConn.model('Product', productSchema);
        const AtlasProduct = atlasConn.model('Product', productSchema);

        console.log("🔍 Fetching products from local...");
        const products = await LocalProduct.find({});
        console.log(`📦 Found ${products.length} products to migrate.`);

        if (products.length > 0) {
            console.log("🚀 Migrating to Atlas...");
            // We strip _id to avoid conflicts if previously seeded
            const productsToInsert = products.map(p => {
                const pojo = p.toObject();
                delete pojo._id;
                delete pojo.__v;
                return pojo;
            });

            await AtlasProduct.insertMany(productsToInsert);
            console.log("✅ Migration Successful!");
        } else {
            console.log("⚠️ No products found in local database.");
        }

        await localConn.close();
        await atlasConn.close();
        process.exit(0);

    } catch (err) {
        console.error("❌ Migration Failed:", err);
        process.exit(1);
    }
}

migrate();
