const Product = require('../Models/Product');
const Order = require('../Models/Order');
const Banner = require('../Models/Banner');

const getAdminStats = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const orderCount = await Order.countDocuments();
        
        res.status(200).json({
            success: true,
            stats: {
                totalProducts: productCount,
                totalOrders: orderCount
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch admin stats' });
    }
};

const getBanner = async (req, res) => {
    try {
        let banner = await Banner.findOne({ active: true });
        if (!banner) {
            banner = await Banner.create({ url: 'https://img.freepik.com/free-vector/modern-sale-banner-template-with-abstract-shapes_23-2148197711.jpg?t=st=1712759900~exp=1712763500~hmac=62f83132e485457efc2f42a6c8e88698778ce358a96677443f1e184e9cd638fc&w=1380' });
        }
        res.status(200).json({ success: true, url: banner.url });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch banner' });
    }
};

const updateBanner = async (req, res) => {
    try {
        const { url } = req.body;
        let banner = await Banner.findOne({ active: true });
        if (banner) {
            banner.url = url;
            await banner.save();
        } else {
            await Banner.create({ url });
        }
        res.status(200).json({ success: true, message: 'Banner updated successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update banner' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ id: 1 });
        res.status(200).json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch products' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { title, description, price, brand, image, images, category, gender } = req.body;
        
        // Find the highest ID and increment it
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const nextId = lastProduct ? lastProduct.id + 1 : 1;

        const newProduct = new Product({
            id: nextId,
            title,
            description,
            price: Number(price),
            brand,
            image,
            images: images || [],
            category,
            gender: gender || 'Unisex',
            rating: "0",
            ratingCount: "0"
        });

        await newProduct.save();
        res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to create product' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, message: 'Order status updated', order: updatedOrder });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update order status' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete product' });
    }
};

module.exports = { 
    getAdminStats, 
    getBanner, 
    updateBanner, 
    getAllOrders, 
    getAllProducts, 
    createProduct,
    updateOrderStatus,
    deleteProduct
};
