const mongoose = require('mongoose');
const ProductModel = require("../Models/Product");

const getProducts = async (req, res) => {
    try {
        const { search, category, sort, gender } = req.query;
        let allFilteredProducts = [];
        let usedProductIds = new Set();

        // 1. Handle Search (Special case: if searching, return all matches or limited?)
        // The user's request focuses on FILTERS. If search is present, we'll follow standard search.
        // 1. Handle Search (Standard search across all products)
        if (search) {
            const searchProducts = await ProductModel.find({
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { brand: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } }
                ]
            });
            return res.status(200).json({
                message: "Products fetched successfully",
                success: true,
                products: searchProducts
            });
        }

        // 2. Handle 'Original Page' / 'All Products' View
        // No category or gender filters active
        if (!category && !gender) {
            // Check if Popular is selected or if we just want ALL products
            if (sort === 'popular') {
                const popularProducts = await ProductModel.find({ category: 'Popular' }).limit(2);
                return res.status(200).json({
                    message: "Popular products fetched successfully",
                    success: true,
                    products: popularProducts
                });
            } else {
                // Return ALL products except those specifically for the 'Offers' section
                let q = ProductModel.find({ category: { $ne: 'Offers' } });
                if (sort === 'price_low') q = q.sort({ price: 1 });
                else if (sort === 'price_high') q = q.sort({ price: -1 });
                
                const allProducts = await q;
                return res.status(200).json({
                    message: "All products fetched successfully",
                    success: true,
                    products: allProducts
                });
            }
        }

        // 3. Handle Category/Gender Filters (2 unique products per filter)
        // This logic runs if either category or gender filters are selected
        
        // Categories
        if (category) {
            const categoriesArr = category.split(',');
            for (const cat of categoriesArr) {
                // Determine limit: 'Offers' and related categories need more, others might be limited for the grid.
                const offerRelatedCategories = ['Offers', 'Trackpants', 'T-Shirts', 'Style', 'Shoes', 'Watches', 'Audio'];
                const productLimit = offerRelatedCategories.includes(cat) ? 6 : 2;
                const catProducts = await ProductModel.find({ category: cat }).limit(productLimit);
                catProducts.forEach(p => {
                    if (!usedProductIds.has(p._id.toString())) {
                        allFilteredProducts.push(p);
                        usedProductIds.add(p._id.toString());
                    }
                });
            }
        }

        // Genders
        if (gender) {
            const gendersArr = gender.split(',');
            for (const g of gendersArr) {
                const genProducts = await ProductModel.find({ gender: g }).limit(2);
                genProducts.forEach(p => {
                    if (!usedProductIds.has(p._id.toString())) {
                        allFilteredProducts.push(p);
                        usedProductIds.add(p._id.toString());
                    }
                });
            }
        }

        // Final sorting for filtered results
        if (sort === 'price_low') {
            allFilteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'price_high') {
            allFilteredProducts.sort((a, b) => b.price - a.price);
        }

        res.status(200).json({
            message: "Filtered products fetched successfully",
            success: true,
            products: allFilteredProducts
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        });
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await ProductModel.find({ category });
        res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        let product = null;

        // Try numeric ID first if it's a number
        if (!isNaN(id)) {
            product = await ProductModel.findOne({ id: parseInt(id) });
        }

        // If not found or if the ID is a 24-char hex string (ObjectId), try _id
        if (!product && mongoose.Types.ObjectId.isValid(id)) {
            product = await ProductModel.findById(id);
        }

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        });
    }
}

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductById
};
