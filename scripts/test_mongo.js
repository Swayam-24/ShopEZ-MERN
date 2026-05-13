const mongoose = require('mongoose');

const uri = "mongodb+srv://myAtlasDBUser:NwYgvpjrLEAtUXIs@myatlasclusteredu.bxkkh7s.mongodb.net/shopez?appName=myAtlasClusterEDU";

console.log("Connecting...");
mongoose.connect(uri)
    .then(() => {
        console.log("SUCCESS!");
        process.exit(0);
    })
    .catch(err => {
        console.error("FAIL:", err.message);
        process.exit(1);
    });
