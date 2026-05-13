import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import './CategoryPage.css'; // Reusing CategoryPage styles for consistency

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [filters, setFilters] = useState({
        categories: [],
        sort: null,
        genders: []
    });

    // Reset filters when a new search is performed
    useEffect(() => {
        setFilters({
            categories: [],
            sort: null,
            genders: []
        });
    }, [query]);

    return (
        <div className="category-page-container">
            <div className="category-page-content">
                <aside className="category-sidebar-wrapper">
                    <FilterSidebar onFilterChange={setFilters} filters={filters} />
                </aside>
                <main className="category-main-content">
                    <div className="category-header">
                        <h1 className="category-title">Search Results</h1>
                        <p className="category-subtitle">
                          {query ? `Showing results for "${query}"` : 'All Products'}
                        </p>
                    </div>
                    <ProductGrid search={query} filters={filters} />
                </main>
            </div>
        </div>
    );
};

export default SearchResultsPage;
