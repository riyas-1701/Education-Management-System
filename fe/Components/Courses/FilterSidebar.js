"use client";
import React from 'react';
import styles from './filterSidebar.module.css';

export default function FilterSidebar({ categories = [], filters, onFilterChange }) {
    const handleCheckboxChange = (category, value) => {
        onFilterChange(category, value);
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="21" x2="4" y2="14"></line>
                        <line x1="4" y1="10" x2="4" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12" y2="3"></line>
                        <line x1="20" y1="21" x2="20" y2="16"></line>
                        <line x1="20" y1="12" x2="20" y2="3"></line>
                        <line x1="1" y1="14" x2="7" y2="14"></line>
                        <line x1="9" y1="8" x2="15" y2="8"></line>
                        <line x1="17" y1="16" x2="23" y2="16"></line>
                    </svg>
                    Filter
                </h3>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Show Results For</div>
                <div className={styles.filterList}>
                    <label className={styles.filterItem}>
                        <input 
                            type="radio" 
                            name="viewType"
                            checked={filters.view === 'courses'}
                            onChange={() => handleCheckboxChange('view', 'courses')}
                        />
                        Courses
                    </label>
                    <label className={styles.filterItem}>
                        <input 
                            type="radio" 
                            name="viewType"
                            checked={filters.view === 'instructors'}
                            onChange={() => handleCheckboxChange('view', 'instructors')}
                        />
                        Instructors
                    </label>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Recently Added</div>
                <div className={styles.filterList}>
                    <label className={styles.filterItem}>
                        <input 
                            type="checkbox" 
                            checked={filters.recentlyAdded}
                            onChange={() => handleCheckboxChange('recentlyAdded', !filters.recentlyAdded)}
                        />
                        Show Recently Added Only
                    </label>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Category</div>
                <div className={styles.filterList}>
                    {categories.map((cat, index) => (
                        <label key={index} className={styles.filterItem}>
                            <input 
                                type="checkbox"
                                checked={filters.categories.includes(cat.category_name)}
                                onChange={() => handleCheckboxChange('categories', cat.category_name)}
                            />
                            {cat.category_name}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Rating</div>
                <div className={styles.filterList}>
                    {[5, 4, 3, 2, 1].map((star) => (
                        <label key={star} className={styles.filterItem}>
                            <input 
                                type="checkbox"
                                checked={filters.ratings.includes(star)}
                                onChange={() => handleCheckboxChange('ratings', star)}
                            />
                            {star} Star {star < 5 ? '& up' : ''}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Prices</div>
                <div className={styles.filterList}>
                    <label className={styles.filterItem}>
                        <input 
                            type="radio"
                            name="priceSort"
                            checked={filters.priceSort === 'lowToHigh'}
                            onChange={() => handleCheckboxChange('priceSort', 'lowToHigh')}
                        />
                        Low to High
                    </label>
                    <label className={styles.filterItem}>
                        <input 
                            type="radio"
                            name="priceSort"
                            checked={filters.priceSort === 'highToLow'}
                            onChange={() => handleCheckboxChange('priceSort', 'highToLow')}
                        />
                        High to Low
                    </label>
                    <label className={styles.filterItem}>
                        <input 
                            type="radio"
                            name="priceSort"
                            checked={filters.priceSort === ''}
                            onChange={() => handleCheckboxChange('priceSort', '')}
                        />
                        Default
                    </label>
                </div>
            </div>
        </aside>
    );
}
