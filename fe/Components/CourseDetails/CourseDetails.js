"use client";
import React, { useState, useEffect } from 'react';
import styles from './courseDetails.module.css';
import Image from 'next/image';

const CourseDetails = ({ id }) => {

    const [courseDetailsState, setCourseDetails] = useState(null);
    useEffect(() => {
        if (id) {
            fetchCourseDetails(id);
        }
    }, [id]);

    const fetchCourseDetails = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5000/course-details/${courseId}`, { credentials: "include" });

            const result = await response.json();
            if (result.success) {
                setCourseDetails(result.course);
            }
        } catch (error) {
            console.log("Error fetching course details:", error);
        }
    }

    console.log("courseData: ", courseDetailsState)
    const [openSections, setOpenSections] = useState({ 0: true });

    const toggleSection = (index) => {
        setOpenSections(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (!courseDetailsState) {
        return <div className={styles.container}>Loading course details...</div>;
    }

    const courseDetails = {
        ...courseDetailsState,
        course_description: courseDetailsState.course_description || '',
        course_learning: courseDetailsState.course_learning || [],
        course_for: courseDetailsState.course_for || [],
        curriculum: [
            {
                title: "Getting Started",
                lecturesCount: 4,
                duration: "51m",
                lectures: [
                    { title: "What is Webflow?", duration: "07:31", type: "video" },
                    { title: "Sign up in Webflow", duration: "07:31", type: "video" },
                    { title: "Webflow Terms & Conditions", duration: "5.3 MB", type: "doc" },
                    { title: "Teaser of Webflow", duration: "07:31", type: "video" },
                    { title: "Practice Project", duration: "5.3 MB", type: "doc" }
                ]
            },
            {
                title: "Secret of Good Design",
                lecturesCount: 52,
                duration: "5h 49m",
                lectures: [
                    { title: "Understanding good design", duration: "10:15", type: "video" },
                    { title: "Color Theory basics", duration: "14:20", type: "video" },
                    { title: "Typography masterclass", duration: "18:45", type: "video" }
                ]
            },
            {
                title: "Practice Design Like an Artist",
                lecturesCount: 43,
                duration: "53m",
                lectures: [
                    { title: "Finding Inspiration", duration: "08:15", type: "video" },
                    { title: "Moodboards creation", duration: "12:30", type: "video" },
                    { title: "Designing your first layout", duration: "25:00", type: "video" }
                ]
            },
            {
                title: "Web Development (webflow)",
                lecturesCount: 137,
                duration: "10h 6m",
                lectures: [
                    { title: "Introduction to Webflow Interface", duration: "12:45", type: "video" },
                    { title: "Box Model and Flexbox", duration: "22:10", type: "video" },
                    { title: "Building a responsive Navbar", duration: "18:30", type: "video" },
                    { title: "Webflow Assets & Styling", duration: "14.2 MB", type: "doc" }
                ]
            },
            {
                title: "Secrets of Making Money Freelancing",
                lecturesCount: 21,
                duration: "38m",
                lectures: [
                    { title: "Finding your first client", duration: "09:20", type: "video" },
                    { title: "Pricing your services", duration: "12:40", type: "video" },
                    { title: "Freelancing Proposal Template", duration: "2.1 MB", type: "doc" },
                    { title: "Closing the deal", duration: "10:15", type: "video" }
                ]
            }
        ],
        instructors: [{
            name: courseDetailsState.instructor_name || "Unknown",
            role: courseDetailsState.instructor_profile || "Instructor",
            rating: courseDetailsState.instructor_rating || 5,
            students: courseDetailsState.students_enrolled || 0,
            courses: 1,
            description: courseDetailsState.instructor_description || "No description available."
        }],
        course_pricing: courseDetailsState.course_price || 0,
        language: courseDetailsState.language || "English",
        subtitle_language: courseDetailsState.subtitle_language || "English"
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <h1 className={styles.title}>{courseDetails.course_title}</h1>
                <p className={styles.subtitle}>{courseDetails.course_subtitle}</p>

                <div className={styles.courseMeta}>
                    <div className={styles.instructorInfo}>
                        <div className={styles.instructorText}>
                            <span className={styles.createdBy}>Created by:</span>
                            <span className={styles.instructorName}>{courseDetails.instructor_name}</span>
                        </div>
                    </div>
                    <div className={styles.ratingInfo}>
                        <div className={styles.stars}>★★★★★</div>
                        <span className={styles.ratingValue}>4.8</span>
                        <span className={styles.ratingCount}>(4144 Ratings)</span>
                    </div>
                </div>

                <div className={styles.videoPlaceholder}>
                    {/* Placeholder for video thumbnail */}
                    <div className={styles.playButton}>▶</div>
                </div>

                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${styles.activeTab}`}>Overview</button>
                    <button className={styles.tab}>Curriculum</button>
                    <button className={styles.tab}>Instructor</button>
                    <button className={styles.tab}>Review</button>
                </div>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Description</h2>
                    {courseDetails.course_description.split('\n\n').map((paragraph, index) => (
                        <p key={index} className={styles.descriptionText}>{paragraph}</p>
                    ))}
                </section>

                <section className={`${styles.section} ${styles.learningBox}`}>
                    <h2 className={styles.sectionTitle}>What you will learn in this course</h2>
                    <ul className={styles.learningList}>
                        {courseDetails.course_learning.map((item, index) => (
                            <li key={index} className={styles.learningItem}>
                                <span className={styles.checkIcon}>✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Who this course is for:</h2>
                    <ul className={styles.courseForList}>
                        {courseDetails.course_for.map((item, index) => (
                            <li key={index} className={styles.courseForItem}>
                                <span className={styles.arrowIcon}>→</span>
                                <span>{item.text || item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.section}>
                    <div className={styles.curriculumHeader}>
                        <h2 className={styles.sectionTitle}>Curriculum</h2>
                        <div className={styles.curriculumStats}>
                            <span>6 Sections</span>
                            <span>202 lectures</span>
                            <span>19h 37m</span>
                        </div>
                    </div>

                    <div className={styles.curriculumList}>
                        {courseDetails.curriculum.map((section, index) => (
                            <div key={index} className={styles.curriculumSection}>
                                <div
                                    className={openSections[index] ? styles.sectionHeader : styles.sectionHeaderClosed}
                                    onClick={() => toggleSection(index)}
                                >
                                    <h3>{section.title}</h3>
                                    <div className={styles.sectionHeaderStats}>
                                        <span>{section.lecturesCount} lectures</span>
                                        <span>{section.duration}</span>
                                    </div>
                                </div>
                                {openSections[index] && (
                                    <div className={styles.sectionContent}>
                                        {section.lectures.map((lecture, lIndex) => (
                                            <div key={lIndex} className={styles.lectureItem}>
                                                <div className={styles.lectureLeft}>
                                                    <span className={lecture.type === 'video' ? styles.playIcon : styles.docIcon}>
                                                        {lecture.type === 'video' ? '▶' : '📄'}
                                                    </span>
                                                    <span>{lecture.title}</span>
                                                </div>
                                                <span className={styles.lectureRight}>{lecture.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Course instructor ({courseDetails.instructors.length.toString().padStart(2, '0')})</h2>
                    <div className={styles.instructorsList}>
                        {courseDetails.instructors.map((instructor, index) => (
                            <div key={index} className={styles.instructorCard}>
                                <div className={styles.instructorCardHeader}>
                                    <div className={styles.instructorAvatarLg}>
                                        {instructor.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className={styles.instructorCardInfo}>
                                        <h3>{instructor.name}</h3>
                                        <p>{instructor.role}</p>
                                        <div className={styles.instructorCardStats}>
                                            <span>⭐ {instructor.rating} Course rating</span>
                                            <span>👥 {instructor.students} Students</span>
                                            <span>▶ {instructor.courses} Courses</span>
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.instructorCardDesc}>
                                    {instructor.description} <span className={styles.readMore}>READ MORE</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className={styles.sidebar}>
                <div className={styles.pricingCard}>
                    <div className={styles.priceRow}>
                        <span className={styles.currentPrice}>${courseDetails.course_pricing.toFixed(2)}</span>
                    </div>


                    <ul className={styles.courseDetailsList}>
                        <li><span>⏱ Course Duration</span> <span>{courseDetails.course_duration}</span></li>
                        <li><span>📊 Course Level</span> <span>{courseDetails.course_level}</span></li>
                        <li><span>👥 Students Enrolled</span> <span>{courseDetails.students_enrolled}</span></li>
                        <li><span>🌐 Language</span> <span>{courseDetails.language}</span></li>
                        <li><span>📝 Subtitle Language</span> <span>{courseDetails.subtitle_language}</span></li>
                    </ul>

                    <button className={styles.addToCartBtn}>Add To Cart</button>
                    <button className={styles.buyNowBtn}>Buy Now</button>

                    <p className={styles.moneyBack}>Note: all course have 30-days money-back guarantee</p>

                    <div className={styles.includesSection}>
                        <h4>This course includes:</h4>
                        <ul>
                            <li><span>⚡</span> Lifetime access</li>
                            <li><span>💰</span> 30-days money-back guarantee</li>
                            <li><span>📁</span> Free exercises file &amp; downloadable resources</li>
                            <li><span>🏆</span> Shareable certificate of completion</li>
                            <li><span>📱</span> Access on mobile, tablet and TV</li>
                            <li><span>📄</span> English subtitles</li>
                            <li><span>🌐</span> 100% online course</li>
                        </ul>
                    </div>

                    <div className={styles.shareSection}>
                        <h4>Share this course:</h4>
                        <div className={styles.shareButtons}>
                            <button className={styles.shareBtn}>Copy link</button>
                            <button className={styles.shareIconBtn}>f</button>
                            <button className={styles.shareIconBtn}>t</button>
                            <button className={styles.shareIconBtn}>✉</button>
                            <button className={styles.shareIconBtn}>w</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
