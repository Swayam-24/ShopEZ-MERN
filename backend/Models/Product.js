const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        default: "0"
    },
    ratingCount: {
        type: String,
        default: "0"
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: String
    },
    category: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Unisex'],
        default: 'Unisex'
    },
    description: {
        type: String
    },
    images: {
        type: [String]
    }
});

const ProductModel = mongoose.model('products', productSchema);
module.exports = ProductModel;
