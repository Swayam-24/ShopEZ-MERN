const express = require('express');
const { signup, login, forgotPassword, resetPassword, verifyOtpCode, getUserStats, getAllUsers } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../MiddleWares/AuthValidation');

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtpCode);
router.post('/reset-password', resetPassword);
router.get('/admin/stats', getUserStats);
router.get('/admin/users', getAllUsers);

module.exports = router;
