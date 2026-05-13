import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart-container">
                <div className="empty-cart-content glass-morph">
                    <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="empty-cart-img" />
                    <h2>Your cart is empty!</h2>
                    <p>Add items to it now.</p>
                    <button className="shop-now-btn" onClick={() => navigate('/')}>Shop Now</button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page-wrapper">
            <div className="cart-container">
                {/* Left: Items List */}
                <div className="cart-items-section">
                    <div className="cart-header glass-morph">
                        <h3>My Cart ({cartCount})</h3>
                    </div>

                    {cartItems.map((item) => {
                        const discountPercentage = item.originalPrice 
                            ? Math.round(((parseInt(item.originalPrice.replace('₹', '')) - item.price) / parseInt(item.originalPrice.replace('₹', ''))) * 100)
                            : 0;

                        return (
                            <div key={item._id} className="cart-item-card glass-morph">
                                <div className="cart-item-main">
                                    <div className="cart-item-left">
                                        <div className="cart-item-img-container">
                                            <img 
                                                src={item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL_MAIN}${item.image}`} 
                                                alt={item.title} 
                                                className="cart-item-img" 
                                            />
                                        </div>
                                        <div className="qty-selector-wrapper">
                                            <div className="qty-dropdown">
                                                <span>Qty: {item.quantity}</span>
                                                <select 
                                                    value={item.quantity} 
                                                    onChange={(e) => updateQuantity(item._id, e.target.value)}
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                        <option key={n} value={n}>{n}</option>
                                                    ))}
                                                </select>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cart-item-middle">
                                        <h4 className="cart-item-title" onClick={() => navigate(`/product/${item.id}`)}>{item.title}</h4>
                                        <p className="cart-item-variant">{item.brand}</p>
                                        <div className="cart-item-rating">
                                            <div className="rating-box">
                                                <span>{item.rating} ★</span>
                                            </div>
                                            <span className="rating-count">({item.ratingCount})</span>
                                        </div>
                                        <div className="cart-item-pricing">
                                            <span className="discount-tag">↓{discountPercentage}%</span>
                                            {item.originalPrice && <span className="price-prev">{item.originalPrice}</span>}
                                            <span className="price-now">₹{item.price * item.quantity}</span>
                                        </div>
                                        <p className="delivery-tag">Delivery by Apr 15, Mon</p>
                                    </div>
                                </div>

                                <div className="cart-item-actions-row">
                                    <button className="cart-action-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                        Save for later
                                    </button>
                                    <button className="cart-action-btn" onClick={() => removeFromCart(item._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        Remove
                                    </button>
                                    <button className="cart-action-btn buy-now" onClick={() => navigate('/checkout', { state: { checkoutItem: item } })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                                        Buy this now
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {/* Removed PLACE ORDER from here as per user request */}
                </div>

                {/* Right: Price Details */}
                <div className="price-details-section">
                    <div className="price-card glass-morph">
                        <h4 className="price-header">PRICE DETAILS</h4>
                        <div className="price-row">
                            <span>Price ({cartCount} items)</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div className="price-row">
                            <span>Delivery Charges</span>
                            <span className="free">FREE</span>
                        </div>
                        <div className="price-total">
                            <span>Total Amount</span>
                            <span>₹{cartTotal}</span>
                        </div>
                    </div>

                    <div className="order-footer glass-morph">
                        <div className="footer-price">
                            <span className="footer-total">₹{cartTotal}</span>
                        </div>
                        <button className="place-order-btn-sidebar" onClick={() => navigate('/checkout')}>Place Order</button>
                    </div>
                    
                    <div className="safe-payment-info">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#878787"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                        <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
