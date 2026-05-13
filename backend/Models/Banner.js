const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        default: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/7fd5e4f5a00b144e.jpg' // Default placeholder
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
