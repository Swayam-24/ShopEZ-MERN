import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('Standard');
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    
    const { addToCart, cartItems } = useCart();
    const isInCart = cartItems.some(item => item.id === product?.id || item._id === product?._id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/products/${id}`);
                const data = await response.json();
                if (data.success) {
                    setProduct(data.product);
                    setActiveImage(data.product.image);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="loader-container"><div className="shopez-loader"></div></div>;
    if (!product) return <div className="error-view">Product not found</div>;

    const discountPercentage = product.originalPrice 
        ? Math.round(((parseInt(product.originalPrice.replace('₹', '')) - product.price) / parseInt(product.originalPrice.replace('₹', ''))) * 100)
        : 0;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
    };

    const handleBuyNow = () => {
        const checkoutItem = {
            ...product,
            quantity: Number(quantity),
            brand: product.brand || 'ShopEz'
        };
        navigate('/checkout', { state: { checkoutItem } });
    };

    return (
        <div className="product-detail-page">
            <button className="back-btn" onClick={() => {
                if (location.state?.from === '/orders') navigate('/orders');
                else if (isInCart) navigate('/cart');
                else navigate(-1);
            }}>
                <span className="back-icon">←</span> back
            </button>

            <div className="detail-container glass-morph">
                {/* Left: Image Gallery */}
                <div className="image-gallery-section">
                    <div className="main-image-wrapper">
                        <img 
                            src={activeImage.startsWith('http') ? activeImage : `${import.meta.env.VITE_API_URL_MAIN}${activeImage}`} 
                            alt={product.title} 
                            className="main-detail-image" 
                        />
                    </div>
                    <div className="thumbnail-list">
                        {(product.images && product.images.length > 0 ? product.images : [product.image]).map((img, index) => (
                            <div 
                                key={index} 
                                className={`thumb-item ${activeImage === img ? 'active' : ''}`}
                                onClick={() => setActiveImage(img)}
                            >
                                <img 
                                    src={img.startsWith('http') ? img : `${import.meta.env.VITE_API_URL_MAIN}${img}`} 
                                    alt={`View ${index + 1}`} 
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Info Section */}
                <div className="product-info-section">
                    <h1 className="detail-title">{product.title}</h1>
                    <p className="detail-brand">Brand: {product.brand}</p>
                    
                    <div className="detail-rating">
                        <span className="stars">{product.rating} ★</span>
                        <span className="count">{product.ratingCount} Ratings & Reviews</span>
                    </div>

                    <div className="detail-pricing">
                        <span className="price-now">₹{product.price}</span>
                        {product.originalPrice && (
                            <>
                                <span className="price-prev">{product.originalPrice}</span>
                                <span className="discount-tag">{discountPercentage}% off</span>
                            </>
                        )}
                    </div>

                    <div className="detail-description">
                        <h3>Description</h3>
                        <p>{product.description || "No description available for this product."}</p>
                    </div>

                    <div className="selectors-container">
                        <div className="select-group">
                            <label>Choose Variant</label>
                            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                                <option value="Standard">Standard Edition</option>
                                <option value="Premium">Premium Kit</option>
                            </select>
                        </div>
                        <div className="select-group">
                            <label>Quantity</label>
                            <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="detail-actions">
                        <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
                        {isInCart ? (
                            <button 
                                className="add-to-cart-btn go-to-cart-btn"
                                onClick={() => navigate('/cart')}
                            >
                                Go to Cart
                            </button>
                        ) : (
                            <button 
                                className="add-to-cart-btn"
                                onClick={() => {
                                    addToCart(product, quantity);
                                    setShowToast(true);
                                    setTimeout(() => setShowToast(false), 5000);
                                }}
                            >
                                Add To Cart
                            </button>
                        )}
                    </div>

                    {showToast && (
                        <div className="cart-toast" onClick={() => navigate('/cart')}>
                            <span>Item added to cart</span>
                            <span className="go-to-cart">GO TO CART</span>
                        </div>
                    )}

                    <div className="delivery-info">
                        <p className="free-delivery">Free delivery in 3-5 days</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
