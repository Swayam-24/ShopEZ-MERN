const mongoose = require('mongoose');
require('dotenv').config();

async function checkIndexes() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const collection = mongoose.connection.collection('addresses');
        const indexes = await collection.indexes();
        console.log('Indexes for addresses collection:', JSON.stringify(indexes, null, 2));
        mongoose.connection.close();
    } catch (err) {
        console.error('FAILED TO CHECK INDEXES:', err);
    }
}

checkIndexes();
