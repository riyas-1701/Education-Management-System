"use client";
import React, { useState, useEffect } from 'react';
import CourseGrid from '../Dashboard/CourseGrid';

export default function RelatedCourses({ currentCourseId }) {
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentCourseId) {
            fetchData();
        }
    }, [currentCourseId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/get-all-courses", { credentials: "include" });
            const allCoursesData = await response.json();

            if (allCoursesData.success) {
                const currentCourse = allCoursesData.data.find(c => c._id === currentCourseId);
                const currentCategory = currentCourse ? currentCourse.category_name : null;
                
                if (currentCategory) {
                    const filtered = allCoursesData.data.filter(course => 
                        course.category_name === currentCategory && course._id !== currentCourseId
                    );
                    setRelatedCourses(filtered);
                }
            }
        } catch (error) {
            console.error("Error fetching related courses:", error);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading related courses...</div>;   
    }

    return (
        <div style={{ marginTop: '40px' }}>
            {relatedCourses.length > 0 ? (
                <CourseGrid 
                    title="Related Courses" 
                    courses={relatedCourses.slice(0, 5)} 
                    showButton={true} 
                    browseAllLink={`/courses?category=${relatedCourses[0]?.category_name || ''}`} 
                />
            ) : (
                <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9fafb', borderRadius: '8px', maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Related Courses</h2>
                    <p style={{ color: '#4e5566', fontSize: '16px' }}>No other courses found in this category.</p>
                </div>
            )}
        </div>
    );
}
