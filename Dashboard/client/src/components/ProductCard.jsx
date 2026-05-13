import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ id, image, brand, title, rating, ratingCount, price, originalPrice }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    const checkoutItem = {
      _id: id,
      title,
      price,
      image,
      brand,
      rating,
      ratingCount,
      quantity: 1
    };
    navigate('/checkout', { state: { checkoutItem } });
  };

  return (
    <div className="shopez-product-card clickable" onClick={handleCardClick}>
      <div className="product-image-container">
        <img 
          src={image.startsWith('http') ? image : `${import.meta.env.VITE_API_URL_MAIN}${image}`} 
          alt={title} 
          className="product-image" 
        />
        <div className="rating-badge">
          <span className="rating-val">{rating} ★</span>
          <span className="rating-count">({ratingCount})</span>
        </div>
      </div>
      
      <div className="product-info">
        <h4 className="product-title" title={title}>{title}</h4>
        <p className="product-brand">{brand}</p>
        
        <div className="product-pricing">
          <span className="current-price">₹{price}</span>
        </div>

        <button className="card-buy-now" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
