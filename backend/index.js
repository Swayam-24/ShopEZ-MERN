const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const ProductRouter = require('./Routes/productRoutes');
const OrderRouter = require('./Routes/orderRoutes');
const AddressRouter = require('./Routes/addressRoutes');
const AdminRouter = require('./Routes/adminRoutes');

require('dotenv').config();
const connectDB = require('./Models/db');

const PORT = process.env.PORT || 8080;

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.use('/api/products', ProductRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/addresses', AddressRouter);
app.use('/api/admin', AdminRouter);
app.get('/api/seed', require('./Controllers/SeedController').seedProducts);
app.get('/api/seed-address', require('./Controllers/SeedController').autoSeedAddress);

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;