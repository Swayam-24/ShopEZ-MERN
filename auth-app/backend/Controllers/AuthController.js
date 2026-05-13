const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const signup = async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists, you can login', success: false });
        }

        const user = new User({ name, email, password, userType: userType || 'Customer' });
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.status(201).json({ message: 'Signup success', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: 'Auth failed, email or password wrong', success: false });
        }

        // Dual Functionality logic:
        // 1. If trying to log in as Admin: User MUST be an Admin.
        // 2. If trying to log in as Customer: User can be either a Customer or an Admin.
        if (userType === 'Admin' && user.userType !== 'Admin') {
            return res.status(403).json({ message: 'Auth failed, you do not have Admin privileges', success: false });
        }
        // No check needed for 'Customer' login because both Admin and Customer can access it.

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: 'Auth failed, email or password wrong', success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: '365d' }
        );

        res.status(200).json({
            message: 'Login Success',
            success: true,
            jwtToken,
            email,
            name: user.name,
            userId: user._id,
            userType: user.userType
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = otp;
        user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();
        console.log(`\n\n=== DEVELOPMENT OTP FOR ${email} ===\nGENERATED OTP: ${otp}\n=================================\n\n`);
        user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        let transporter;
        let senderEmail;

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            senderEmail = process.env.EMAIL_USER;
        } else {
            console.warn("EMAIL_USER/EMAIL_PASS missing in .env! Generating a testing email account to prevent server crash...");
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
            senderEmail = '"MERN Auth App" <no-reply@test.com>';
        }

        const mailOptions = {
            from: senderEmail,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
        };

        const info = await transporter.sendMail(mailOptions);

        if (!process.env.EMAIL_USER) {
            console.log("Test Email sent! You can view the mock OTP email here: %s", nodemailer.getTestMessageUrl(info));
        }

        res.status(200).json({ message: 'OTP sent successfully', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        if (user.resetOtp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP', success: false });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = undefined;
        user.resetOtpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const verifyOtpCode = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        if (user.resetOtp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP', success: false });
        }

        if (user.resetOtpExpiry < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired', success: false });
        }

        res.status(200).json({ message: 'OTP verified successfully', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const getUserStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ success: true, count: userCount });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch user stats' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
};

module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
    verifyOtpCode,
    getUserStats,
    getAllUsers
};
