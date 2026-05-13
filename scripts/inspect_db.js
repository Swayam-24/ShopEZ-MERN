const mongoose = require('mongoose');

const mongo_url = "mongodb+srv://myAtlasDBUser:NwYgvpjrLEAtUXIs@myatlasclusteredu.bxkkh7s.mongodb.net/shopez?appName=myAtlasClusterEDU";

const inspectDB = async () => {
    try {
        await mongoose.connect(mongo_url);
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('COLLECTIONS:' + collections.map(c => c.name).join(','));
        
        const UserSchema = new mongoose.Schema({}, { strict: false });
        const User = mongoose.model('User', UserSchema);
        const userCount = await User.countDocuments({});
        console.log('USER_COUNT:' + userCount);
        
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

inspectDB();
