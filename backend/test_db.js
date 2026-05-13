const mongoose = require('mongoose');
require('dotenv').config();
const Address = require('./Models/Address');

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const testAddr = new Address({
            userId: 'test_user_123',
            name: 'Test Name',
            mobile: '1234567890',
            pincode: '123456',
            locality: 'Test Locality',
            addressLine: 'Test Address Line',
            city: 'Test City',
            state: 'Odisha',
            addressType: 'Home'
        });

        const saved = await testAddr.save();
        console.log('Successfully saved test address:', saved);
        
        await Address.deleteOne({ _id: saved._id });
        console.log('Successfully cleaned up test address');
        
        mongoose.connection.close();
    } catch (err) {
        console.error('DATABASE TEST FAILED:', err);
        process.exit(1);
    }
}

test();
