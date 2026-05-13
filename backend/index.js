const express = require('express');
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
require('./Models/db');

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
app.use('/images', express.static('public/images'));

app.use('/api/products', ProductRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/addresses', AddressRouter);
app.use('/api/admin', AdminRouter);

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;