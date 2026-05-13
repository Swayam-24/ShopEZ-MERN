import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const [userName, setUserName] = useState("Swayam");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem('loggedInUser');
    if (storedName) setUserName(storedName);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setShowDropdown(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('loggedInUser');
    setShowLogoutModal(false);
    navigate('/logout-success');
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const categories = [
    { name: "For You", path: "/" },
    { name: "Fashion", path: "/category/Fashion" },
    { name: "Mobiles", path: "/category/Mobiles" },
    { name: "Beauty", path: "/category/Beauty" },
    { name: "Electronics", path: "/category/Electronics" },
    { name: "Home", path: "/category/Home" },
    { name: "Appliances", path: "/category/Appliances" },
    { name: "Toys & Baby", path: "/category/Toys%20&%20Baby" },
    { name: "Food & Health", path: "/category/Food%20&%20Health" },
    { name: "Auto Gear", path: "/category/Auto%20Gear" },
    { name: "Two Wheelers", path: "/category/Two%20Wheelers" },
    { name: "Sports", path: "/category/Sports" },
    { name: "Books", path: "/category/Books" },
    { name: "Furniture", path: "/category/Furniture" }
  ];

  const categoryIcons = {
    "For You": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="10" width="8" height="6" fill="#ffe11b" stroke="none"/><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>,
    "Fashion": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>,
    "Mobiles": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="4" width="6" height="3" fill="#ffe11b" stroke="none"/><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
    "Beauty": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="11" width="10" height="11"></rect><path d="M9 11V6l3-3 3 3v5" fill="#ffe11b"></path><path d="M9 11V6l3-3 3 3v5"></path></svg>,
    "Electronics": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line></svg>,
    "Home": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 2l-4 8h18l-4-8z"></path><line x1="12" y1="10" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line></svg>,
    "Appliances": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" ry="2" fill="#ffe11b" fillOpacity="0.3"></rect><path d="M8 21h8"></path><path d="M12 19v2"></path></svg>,
    "Toys & Baby": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" fill="#ffe11b" stroke="none"/><circle cx="12" cy="12" r="5"></circle><circle cx="7.5" cy="7.5" r="2.5"></circle><circle cx="16.5" cy="7.5" r="2.5"></circle><circle cx="8" cy="16" r="3"></circle><circle cx="16" cy="16" r="3"></circle></svg>,
    "Food & Health": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="6" width="10" height="16" rx="2"></rect><rect x="6" y="2" width="12" height="4" rx="1" fill="#ffe11b"></rect><line x1="7" y1="12" x2="17" y2="12"></line></svg>,
    "Auto Gear": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2A10 10 0 0 0 2 12v6h20v-6A10 10 0 0 0 12 2z"></path><path d="M14 10a4 4 0 0 1-4 4h-4v-4Z" fill="#ffe11b"></path><path d="M14 10a4 4 0 0 1-4 4h-4v-4Z"></path></svg>,
    "Two Wheelers": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="16" r="3"></circle><circle cx="18" cy="16" r="3"></circle><path d="M14 16h-5"></path><path d="M6 13l4-7h5"></path><path d="M15 6v4h4" stroke="#ffe11b" strokeWidth="3"></path><path d="M15 6v4h4"></path></svg>,
    "Sports": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="6" height="14" rx="1"></rect><rect x="7" y="16" width="4" height="6" rx="1"></rect><circle cx="18" cy="16" r="2" fill="#ffe11b"></circle></svg>,
    "Books": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
    "Furniture": <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="6" rx="2" fill="#ffe11b" fillOpacity="0.5"></rect><path d="M20 16v4"></path><path d="M4 16v4"></path><path d="M6 10V6A2 2 0 0 1 8 4h8a2 2 0 0 1 2 2v4"></path></svg>
  };

  const accountMenuItems = [
    { 
      name: "My Profile", 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      path: "/profile" 
    },
    { 
      name: "Orders", 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>,
      path: "/orders" 
    },
    { 
      name: "Saved Addresses", 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      path: "/addresses" 
    },
    { 
      name: "Logout", 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
      action: handleLogoutClick 
    }
  ];

  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="shopez-navbar">
      <div className="shopez-top-row">
        <div className="shopez-brand-section" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="shopez-logo">
            <span className="shopez-logo-icon">⭐</span>
            <span className="shopez-logo-text">ShopEz</span>
          </div>
          <span className="shopez-welcome">Welcome , <strong className="shopez-user-name">{userName}</strong></span>
        </div>
        
        <div className="shopez-address-section-wrapper">
          <div className="shopez-address-section">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span className="shopez-address-text">Laxmisagar, Bhubaneswar, Odisha</span>
            <button className="chevron" style={{ background: 'none', border: 'none', padding: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
          <div className="shopez-supercoin">
            <span className="coin-icon">💰</span>
            <span className="coin-val">0</span>
          </div>
        </div>
      </div>

      <div className="shopez-mid-row">
        <div className="shopez-search-container">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input 
            type="text" 
            className="shopez-search-input" 
            placeholder="Search for Products, Brands and More" 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`);
              }
            }}
          />
        </div>
        
        <div className="shopez-actions-group">
          <div 
            ref={dropdownRef}
            className={`shopez-action-btn account-btn ${showDropdown ? 'active' : ''}`}
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ position: 'relative' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span style={{ cursor: 'pointer' }}>Account</span>
            <svg className={`down-chevron ${showDropdown ? 'rotate' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
            
            {showDropdown && (
              <div className="shopez-account-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-header">Your Account</div>
                {accountMenuItems.map((item, idx) => (
                  <div key={idx} className="dropdown-item" onClick={() => item.action ? item.action() : navigate(item.path)} style={{ cursor: 'pointer' }}>
                    <span className="item-icon">{item.icon}</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="shopez-action-btn" onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
            <div className="cart-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </div>
            <span>Cart</span>
          </div>
        </div>
      </div>

      <div className="shopez-bottom-row">
        <div className="shopez-category-list">
          {categories.map((cat, index) => {
            const isActive = cat.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(cat.path);
              
            return (
              <div 
                key={index} 
                className={`shopez-category-item ${isActive ? 'active' : ''}`}
                onClick={() => navigate(cat.path)}
                style={{ cursor: 'pointer' }}
              >
                <div className="shopez-category-icon">{categoryIcons[cat.name]}</div>
                <span className="shopez-category-name">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {showLogoutModal && (
        <div className="navbar-modal-overlay">
          <div className="navbar-modal-content">
            <button className="navbar-modal-close-cross" onClick={closeLogoutModal}>&times;</button>
            <h2>Are you sure you want to Logout?</h2>
            <div className="navbar-modal-actions">
              <button className="navbar-modal-btn yes" onClick={confirmLogout}>Yes</button>
              <button className="navbar-modal-btn no" onClick={closeLogoutModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;