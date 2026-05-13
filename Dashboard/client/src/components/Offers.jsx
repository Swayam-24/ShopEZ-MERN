import React, { useState, useEffect } from 'react';
import './Offers.css';
import { useNavigate } from 'react-router-dom';

const Offers = ({ onOfferClick }) => {
  const [offerList, setOfferList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/products?category=Offers`);
        const data = await response.json();
        if (data.success) {
          const sortedOffers = data.products.sort((a, b) => a.id - b.id);
          setOfferList(sortedOffers);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleCardClick = (offer) => {
    const categoryMapping = {
      'Trackpant combo': 'Trackpants',
      'Trendy t-shirts': 'T-Shirts',
      'Style your way': 'Style',
      'Casual shoes': 'Shoes',
      'Smartwatches': 'Watches',
      'Wireless Headphones': 'Audio'
    };
    const targetCategory = categoryMapping[offer.brand] || 'Offers';
    if (onOfferClick) {
      onOfferClick(targetCategory);
    }
  };

  if (loading) return null;

  return (
    <div className="shopez-offers-section">
      <div className="shopez-offers-container">
        {offerList.map((offer) => (
          <div 
            key={offer.id} 
            className="shopez-offer-card"
            onClick={() => handleCardClick(offer)}
            style={{ cursor: 'pointer' }}
          >
            <div className="shopez-offer-image-wrapper">
              <img 
                src={offer.image.startsWith('http') ? offer.image : `${import.meta.env.VITE_API_URL_MAIN}${offer.image}`} 
                alt={offer.brand} 
                className="shopez-offer-image" 
              />
            </div>
            <div className="shopez-offer-info">
              <p className="shopez-offer-title">{offer.title}</p>
              <p className="shopez-offer-label">{offer.brand}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
