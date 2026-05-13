const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./auth-app/backend/models/User');

dotenv.config({ path: './auth-app/backend/.env' });

const updateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONN || 'mongodb://localhost:27017/auth-db');
        const user = await User.findOneAndUpdate(
            { email: 'satapathyswayam08@gmail.com' },
            { userType: 'Admin' },
            { new: true }
        );
        if (user) {
            console.log(`User ${user.email} is now an Admin!`);
        } else {
            console.log("User not found.");
        }
        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

updateAdmin();
