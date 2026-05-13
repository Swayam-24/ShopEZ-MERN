import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';
import solarBanner from '../assets/solar-banner.png';
import voltasBanner from '../assets/voltas-banner.png';
import gamingBanner from '../assets/gaming-laptop-banner.png';

const Banner = () => {
  const navigate = useNavigate();
  const baseImages = [
    { src: solarBanner, category: 'Solar' },
    { src: voltasBanner, category: 'Voltas' },
    { src: gamingBanner, category: 'Gaming Laptop' }
  ];
  
  const [images, setImages] = useState([...baseImages, ...baseImages]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    fetchDynamicBanner();
  }, []);

  const fetchDynamicBanner = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/admin/banner`);
      const data = await res.json();
      if (data.success && data.url && data.url.length > 20) {
        const fullUrl = data.url.startsWith('http') ? data.url : `${import.meta.env.VITE_API_URL_MAIN}${data.url}`;
        const dynamicBanner = { src: fullUrl, category: 'Latest' };
        const newBase = [dynamicBanner, ...baseImages];
        setImages([...newBase, ...newBase]);
      }
    } catch (err) {
      console.error('Failed to fetch dynamic banner:', err);
    }
  };

  const nextSlide = () => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleBannerClick = (category) => {
    navigate(`/category/${category}`);
  };

  useEffect(() => {
    // Auto-scroll every 5 seconds
    timeoutRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(timeoutRef.current);
  }, []);

  useEffect(() => {
    // When we reach the start of the second set, 'teleport' back to the start of the first set
    const halfLen = images.length / 2;
    if (currentIndex === halfLen) {
      const resetTimeout = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(0);
      }, 600); // Wait for the transition to finish
      
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, images.length]);

  return (
    <div className="shopez-banner-outer-container">
      {/* Top Separation Line */}
      <div className="shopez-banner-separator"></div>

      <div className="shopez-banner-mask">
        <div 
          className="shopez-banner-slides-container" 
          style={{ 
            transform: `translateX(-${currentIndex * 42}%)`,
            transition: transitionEnabled ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
          }}
        >
          {images.map((item, idx) => (
            <div 
              key={idx} 
              className="shopez-banner-slide"
              onClick={() => handleBannerClick(item.category)}
              style={{ cursor: 'pointer' }}
            >
              <div className="shopez-card-inner">
                <img 
                  src={item.src} 
                  alt={`Promo ${idx % (images.length / 2) + 1}`} 
                  className="shopez-banner-image"
                  onError={(e) => {
                    e.target.src = 'https://img.freepik.com/free-vector/modern-sale-banner-template-with-abstract-shapes_23-2148197711.jpg?t=st=1712759900~exp=1712763500~hmac=62f83132e485457efc2f42a6c8e88698778ce358a96677443f1e184e9cd638fc&w=1380';
                    e.target.onerror = null;
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Dots (linked to active index mod length) */}
      <div className="shopez-banner-dots">
        {Array.from({ length: images.length / 2 }).map((_, idx) => (
          <div 
            key={idx} 
            className={`shopez-banner-dot ${currentIndex % (images.length / 2) === idx ? 'active' : ''}`}
            onClick={() => {
              setTransitionEnabled(true);
              setCurrentIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
