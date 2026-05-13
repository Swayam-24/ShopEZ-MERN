const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URI;

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(mongo_url, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.log('MongoDB Connection Error: ', err);
    }
};

module.exports = connectDB;
