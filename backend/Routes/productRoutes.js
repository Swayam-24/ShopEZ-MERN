const router = require('express').Router();
const { getProducts, getProductsByCategory, getProductById } = require('../Controllers/ProductController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);

module.exports = router;
