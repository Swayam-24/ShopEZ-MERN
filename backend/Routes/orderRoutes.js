const express = require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrderController');

router.post('/create', OrderController.createOrder);
router.get('/user/:userId', OrderController.getUserOrders);
router.put('/cancel/:orderId', OrderController.cancelOrder);

module.exports = router;
