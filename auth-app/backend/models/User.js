const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        userType: {
            type: String,
            enum: ['Admin', 'Customer'],
            default: 'Customer'
        },
        resetOtp: {
            type: String,
        },
        resetOtpExpiry: {
            type: Date,
        },
        phone: {
            type: String,
        },
        profileImage: {
            type: String,
        },
        addresses: [
            {
                name: String,
                mobile: String,
                pincode: String,
                locality: String,
                address: String,
                cityDistTown: String,
                state: String,
                landmark: String,
                alternatePhone: String,
                addressType: {
                    type: String,
                    enum: ['Home', 'Work'],
                    default: 'Home'
                },
                isDefault: {
                    type: Boolean,
                    default: false
                }
            }
        ],
    },
    {
        timestamps: true,
    }
);
    
const User = mongoose.model("User", userSchema);

module.exports = User;