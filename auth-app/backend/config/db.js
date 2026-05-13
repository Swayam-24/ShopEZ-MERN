const mongoose = require('mongoose');

const  connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};

module.exports = connectDB;