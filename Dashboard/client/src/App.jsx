import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Offers from './components/Offers';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import SearchResultsPage from './components/SearchResultsPage';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Addresses from './pages/Addresses';
import LogoutSuccess from './pages/LogoutSuccess';
import { CartProvider } from './context/CartContext';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogoutSuccess = location.pathname === '/logout-success';

  useEffect(() => {
    // Handle session synchronization from auth-app
    const queryParams = new URLSearchParams(location.search);
    const userIdParam = queryParams.get('userId');
    const userNameParam = queryParams.get('user');

    if (userIdParam) {
      localStorage.setItem('userId', userIdParam);
      if (userNameParam) localStorage.setItem('loggedInUser', userNameParam);
      
      // Clean URL after capture
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // Force a re-render or notification if needed (Navbar already listens to localStorage changes via its own useEffect or reload)
      window.location.reload(); // Quickest way to ensure all components sync with new storage
    }
  }, [location]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    sort: null,
    genders: []
  });

  const handleOfferClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <CartProvider>
      <div className="dashboard-container">
        {!isLogoutSuccess && <Navbar onSearch={setSearchQuery} />}
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <Offers onOfferClick={handleOfferClick} />
              <div className="dashboard-browse-section">
                <FilterSidebar onFilterChange={setFilters} filters={filters} />
                <main className="dashboard-content">
                  <div className="dashboard-header-text">
                    <h2 className="section-title">More Products for you</h2>
                  </div>
                  <ProductGrid search={searchQuery} filters={filters} limit={12} />
                </main>
              </div>
            </>
          } />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/logout-success" element={<LogoutSuccess />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;