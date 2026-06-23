"use client";
import React from 'react';
import styles from './pagination.module.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    // If there's only 1 page or no pages, we don't need to show pagination
    if (totalPages <= 1) return null;
    // Helper to generate the array of page numbers
    const getPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };
    return (
        <div className={styles.paginationContainer}>
            <button
                className={styles.pageButton}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FiChevronLeft className={styles.icon} />
            </button>

            {getPages().map((page) => (
                <button
                    key={page}
                    className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className={styles.pageButton}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FiChevronRight className={styles.icon} />
            </button>
        </div>
    );
}