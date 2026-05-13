const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    addressLine: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landmark: {
        type: String
    },
    altPhone: {
        type: String
    },
    addressType: {
        type: String,
        enum: ['Home', 'Work'],
        default: 'Home'
    }
}, { timestamps: true });

module.exports = mongoose.model('Address', AddressSchema);
