const signupValidation = (req, res, next) => {
    const { name, email, password } = req.body;
    
    // Basic Custom Validation
    if (!name || name.length < 3) {
        return res.status(400).json({ message: "Name is required (min 3 chars)", success: false })
    }
    if (!email || !email.includes('@')) {
        return res.status(400).json({ message: "Valid email is required", success: false })
    }
    if (!password || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long", success: false })
    }
    
    // If validation passes
    next();
}

const loginValidation = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required", success: false })
    }
    
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}
