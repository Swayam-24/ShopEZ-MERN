const express = require('express');
const router = express.Router();
const Address = require('../Models/Address');

// Get all addresses for a user
router.get('/:userId', async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, addresses });
    } catch (err) {
        console.error("Fetch Address Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Add a new address
router.post('/', async (req, res) => {
    try {
        const newAddress = new Address(req.body);
        const savedAddress = await newAddress.save();
        res.status(201).json({ success: true, address: savedAddress });
    } catch (err) {
        console.error("Save Address Error:", err);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: "Validation Error: " + messages.join(', ') });
        }
        res.status(500).json({ success: false, message: err.message });
    }
});

// Update an address
router.put('/:id', async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ success: true, address: updatedAddress });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error updating address" });
    }
});

// Delete an address
router.delete('/:id', async (req, res) => {
    try {
        await Address.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Address deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error deleting address" });
    }
});

module.exports = router;
