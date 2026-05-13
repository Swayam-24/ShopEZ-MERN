const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/AdminController');

router.get('/stats', AdminController.getAdminStats);
router.get('/banner', AdminController.getBanner);
router.post('/banner', AdminController.updateBanner);
router.get('/orders', AdminController.getAllOrders);
router.get('/products', AdminController.getAllProducts);
router.post('/products', AdminController.createProduct);
router.put('/orders/:orderId', AdminController.updateOrderStatus);
router.delete('/products/:productId', AdminController.deleteProduct);

module.exports = router;
