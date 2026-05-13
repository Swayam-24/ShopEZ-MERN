import React, { useState, useEffect } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ onFilterChange, filters }) => {
  const [selectedSort, setSelectedSort] = useState(filters?.sort || null);
  const [selectedCategories, setSelectedCategories] = useState(filters?.categories || []);
  const [selectedGenders, setSelectedGenders] = useState(filters?.genders || []);

  // Sync internal state with props when they change (e.g., from Offers click)
  useEffect(() => {
    setSelectedSort(filters?.sort || null);
    setSelectedCategories(filters?.categories || []);
    setSelectedGenders(filters?.genders || []);
  }, [filters]);

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSelectedSort(newSort);
    onFilterChange({ 
        sort: newSort, 
        categories: selectedCategories,
        genders: selectedGenders 
    });
  };

  const handleCategoryChange = (e) => {
    const { checked, value } = e.target;
    let newCategories = [...selectedCategories];
    if (checked) {
      newCategories.push(value);
    } else {
      newCategories = newCategories.filter(cat => cat !== value);
    }
    setSelectedCategories(newCategories);
    onFilterChange({ 
        sort: selectedSort, 
        categories: newCategories,
        genders: selectedGenders
    });
  };

  const handleGenderChange = (e) => {
    const { checked, value } = e.target;
    let newGenders = [...selectedGenders];
    if (checked) {
      newGenders.push(value);
    } else {
      newGenders = newGenders.filter(g => g !== value);
    }
    setSelectedGenders(newGenders);
    onFilterChange({ 
        sort: selectedSort, 
        categories: selectedCategories,
        genders: newGenders
    });
  };

  const handleClearAll = () => {
    onFilterChange({ 
        sort: null, 
        categories: [],
        genders: [] 
    });
  };

  return (
    <aside className="shopez-sidebar">
      <div className="sidebar-header">
        <h2 className="filters-main-title">Filters</h2>
        <button className="clear-all-btn" onClick={handleClearAll}>Clear All</button>
      </div>

      {/* Sort By Section */}
      <div className="filter-group">
        <h3 className="filter-group-title">Sort By</h3>
        <div className="filter-options">
          <label className="radio-option">
            <input 
              type="radio" 
              name="sort" 
              value="popular"
              checked={selectedSort === 'popular'}
              onChange={handleSortChange}
            />
            <span className="radio-custom"></span>
            <span className="option-label">Popular</span>
          </label>
          <label className="radio-option">
            <input 
              type="radio" 
              name="sort" 
              value="price_low"
              checked={selectedSort === 'price_low'}
              onChange={handleSortChange} 
            />
            <span className="radio-custom"></span>
            <span className="option-label">Price (low to high)</span>
          </label>
          <label className="radio-option">
            <input 
              type="radio" 
              name="sort" 
              value="price_high"
              checked={selectedSort === 'price_high'}
              onChange={handleSortChange} 
            />
            <span className="radio-custom"></span>
            <span className="option-label">Price (high to low)</span>
          </label>
        </div>
      </div>

      {/* Categories Section */}
      <div className="filter-group">
        <h3 className="filter-group-title">Categories</h3>
        <div className="filter-options">
          {['Mobiles', 'Electronics', 'Fashion', 'Home', 'Appliances', 'Beauty', 'Toys & Baby', 'Food & Health', 'Auto Gear', 'Two Wheelers', 'Sports', 'Books', 'Furniture'].map(cat => (
            <label key={cat} className="checkbox-option">
              <input 
                type="checkbox" 
                value={cat}
                checked={selectedCategories.includes(cat)}
                onChange={handleCategoryChange}
              />
              <span className="checkbox-custom"></span>
              <span className="option-label">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender Section */}
      <div className="filter-group">
        <h3 className="filter-group-title">Gender</h3>
        <div className="filter-options">
          {['Men', 'Women', 'Unisex'].map(gender => (
            <label key={gender} className="checkbox-option">
              <input 
                type="checkbox" 
                value={gender}
                checked={selectedGenders.includes(gender)}
                onChange={handleGenderChange}
              />
              <span className="checkbox-custom"></span>
              <span className="option-label">{gender}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
