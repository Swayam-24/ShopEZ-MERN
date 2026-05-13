import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import Navbar from './Navbar';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [categoryName],
    sort: null,
    genders: []
  });

  // Re-initialize filters when the URL parameter changes
  useEffect(() => {
    setFilters({
      categories: [categoryName],
      sort: null,
      genders: []
    });
  }, [categoryName]);

  return (
    <div className="category-page-container">
      <div className="category-page-content">
        <aside className="category-sidebar-wrapper">
          <FilterSidebar onFilterChange={setFilters} filters={filters} />
        </aside>
        <main className="category-main-content">
          <div className="category-header">
            <h1 className="category-title">{categoryName}</h1>
            <p className="category-subtitle">Showing results for {categoryName}</p>
          </div>
          <ProductGrid search={searchQuery} filters={filters} />
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
