import React from 'react';
import './LogoutSuccess.css';

const LogoutSuccess = () => {
    const handleLoginRedirect = () => {
        // Redirect to the login page on port 5173
        window.location.href = 'http://localhost:5173';
    };

    return (
        <div className="logout-success-wrapper">
            <div className="logout-success-card glass-morph">
                <div className="success-check-icon">✓</div>
                <h1>Thank You, Visit Again!</h1>
                <p>You have been successfully logged out of ShopEz. We hope to see you back soon!</p>
                
                <button 
                    className="login-redirect-btn" 
                    onClick={handleLoginRedirect}
                >
                    Get back to Login!
                </button>
            </div>
        </div>
    );
};

export default LogoutSuccess;
