"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../../Components/Dashboard/Navbar';
import Footer from '../../../Components/Dashboard/Footer';
import FilterSidebar from '../../../Components/Courses/FilterSidebar';
import CourseCard from '../../../Components/Dashboard/CourseCard';
import InstructorCard from '../../../Components/Dashboard/InstructorCard';
import styles from './courses.module.css';
import Pagination from '../../../Components/Pagination/Pagination';

export default function CoursesPage() {
    const [allCourses, setAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [allInstructors, setAllInstructors] = useState([]);
    const [filteredInstructors, setFilteredInstructors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;
    // const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        recentlyAdded: false,
        categories: [],
        ratings: [],
        priceSort: '', // 'lowToHigh' | 'highToLow' | ''
        view: 'courses' // 'courses' | 'instructors'
    });

    useEffect(() => {
        // Read initial filters from URL
        const searchParams = new URLSearchParams(window.location.search);
        const initialFilters = {
            recentlyAdded: searchParams.get('recentlyAdded') === 'true',
            categories: [],
            ratings: [],
            priceSort: searchParams.get('priceSort') || '',
            view: searchParams.get('view') || 'courses'
        };
        setFilters(initialFilters);

        fetchData();
    }, []);

    useEffect(() => {
        if (filters.view === 'courses') {
            applyFiltersAndSortCourses();
        } else {
            applyFiltersAndSortInstructors();
        }
    }, [allCourses, allInstructors, filters]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [coursesRes, categoriesRes, instructorsRes] = await Promise.all([
                fetch("http://localhost:5000/get-all-courses", { credentials: "include" }),
                fetch("http://localhost:5000/get-categories", { credentials: "include" }),
                fetch("http://localhost:5000/get-all-instructors", { credentials: "include" })
            ]);

            const coursesData = await coursesRes.json();
            const categoriesData = await categoriesRes.json();
            const instructorsData = await instructorsRes.json();

            if (coursesData.success) {
                setAllCourses(coursesData.data);
                setFilteredCourses(coursesData.data);
            }
            if (categoriesData.success) {
                setCategories(categoriesData.data);
            }
            if (instructorsData.success) {
                setAllInstructors(instructorsData.data);
                setFilteredInstructors(instructorsData.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filterType, value) => {
        setCurrentPage(1);
        setFilters(prev => {
            const newFilters = { ...prev };

            if (filterType === 'recentlyAdded' || filterType === 'priceSort' || filterType === 'view') {
                newFilters[filterType] = value;
            } else if (filterType === 'categories' || filterType === 'ratings') {
                if (newFilters[filterType].includes(value)) {
                    newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
                } else {
                    newFilters[filterType] = [...newFilters[filterType], value];
                }
            }

            return newFilters;
        });
    };

    const applyFiltersAndSortCourses = () => {
        let result = [...allCourses];

        if (filters.recentlyAdded) {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            result = result.filter(c => new Date(c.createdAt) >= thirtyDaysAgo);
        }

        if (filters.categories.length > 0) {
            result = result.filter(c => filters.categories.includes(c.category_name));
        }

        if (filters.ratings.length > 0) {
            result = result.filter(c => {
                const rating = parseFloat(c.course_rating);
                const minSelectedRating = Math.min(...filters.ratings);
                return rating >= minSelectedRating;
            });
        }

        if (filters.priceSort === 'lowToHigh') {
            result.sort((a, b) => parseFloat(a.course_price) - parseFloat(b.course_price));
        } else if (filters.priceSort === 'highToLow') {
            result.sort((a, b) => parseFloat(b.course_price) - parseFloat(a.course_price));
        }

        setFilteredCourses(result);
    };

    const applyFiltersAndSortInstructors = () => {
        let result = [...allInstructors];

        if (filters.ratings.length > 0) {
            result = result.filter(i => {
                const rating = parseFloat(i.instructor_rating);
                const minSelectedRating = Math.min(...filters.ratings);
                return rating >= minSelectedRating;
            });
        }

        setFilteredInstructors(result);
    };

    const totalPages = filters.view === 'courses'
        ? Math.ceil(filteredCourses.length / ITEMS_PER_PAGE)
        : Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE);

    const currentCourses = filteredCourses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const currentInstructors = filteredInstructors.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) {
        return (
            <>
                <Navbar />
                <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>
                <Footer />
            </>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <Navbar />

            <div className={styles.contentWrapper}>
                <FilterSidebar
                    categories={categories}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                <div className={styles.mainContent}>
                    <div className={styles.topBar}>
                        <div className={styles.suggestion}>
                            Suggestion: UI/UX Design, Web Design
                        </div>
                        <div className={styles.resultsCount}>
                            {filters.view === 'courses' ? filteredCourses.length : filteredInstructors.length} results found
                        </div>
                    </div>

                    <div className={styles.courseGridWrapper}>
                        {filters.view === 'courses' ? (
                            currentCourses.length > 0 ? (
                                currentCourses.map((course, idx) => (
                                    <CourseCard key={course._id || idx} course={course} index={idx} />
                                ))
                            ) : (
                                <p>No courses found matching your criteria.</p>
                            )
                        ) : (
                            currentInstructors.length > 0 ? (
                                currentInstructors.map((instructor, idx) => (
                                    <InstructorCard key={instructor.instructor_id || idx} instructor={instructor} index={idx} />
                                ))
                            ) : (
                                <p>No instructors found matching your criteria.</p>
                            )
                        )}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}
