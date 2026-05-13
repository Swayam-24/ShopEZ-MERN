import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ search, filters, limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (filters && filters.categories.length > 0) {
        queryParams.append('category', filters.categories.join(','));
      }
      if (filters && filters.genders && filters.genders.length > 0) {
        queryParams.append('gender', filters.genders.join(','));
      }
      if (filters && filters.sort !== 'popular') {
        queryParams.append('sort', filters.sort);
      }

      // We still fetch normally but we will slice the result if limit is provided
      const response = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/products?${queryParams.toString()}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, filters]);

  const displayedProducts = limit ? products.slice(0, limit) : products;

  if (loading) {
    return (
      <div className="product-grid-container">
        <div className="loading-spinner">Loading fresh products for you...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-grid-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      {displayedProducts.length > 0 ? (
        <div className="shopez-product-grid">
          {displayedProducts.map(product => (
            <ProductCard key={product.id || product._id} {...product} />
          ))}
        </div>
      ) : (
        <div className="no-products-found">
          <div className="no-products-icon">🔍</div>
          <h3>No products found</h3>
          <p>We couldn't find any products matching your current filters or search criteria. Try clearing some filters or searching for something else!</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
