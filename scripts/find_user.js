const mongoose = require('mongoose');

const mongo_url = "mongodb+srv://myAtlasDBUser:NwYgvpjrLEAtUXIs@myatlasclusteredu.bxkkh7s.mongodb.net/shopez?appName=myAtlasClusterEDU";

const findUser = async () => {
    try {
        await mongoose.connect(mongo_url);
        const UserSchema = new mongoose.Schema({}, { strict: false });
        const User = mongoose.model('User', UserSchema);
        const user = await User.findOne({});
        if (user) {
            console.log('USER_ID_FOUND:' + user._id);
        } else {
            console.log('NO_USER_FOUND');
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

findUser();
