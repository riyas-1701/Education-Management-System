// components/CourseGrid/CourseGrid.js
"use client";
import CourseCard from "./CourseCard";
import styles from "./courseGrid.module.css";

export default function CourseGrid({ title, courses = [], showButton = true }) {
    return (
        <section className={styles.section} style={{}}>
            <div className={styles.container}>
                <h2 className={styles.heading}>{title}</h2>

                <div className={styles.grid}>
                    {courses.map((course, index) => (
                        <CourseCard key={course._id} course={course} index={index} />
                    ))}
                </div>
            </div>

            {showButton && (
                <div className={styles.buttonWrapper}>
                    <button className={styles.browseBtn}>
                        Browse All
                    </button>
                </div>
            )}
        </section >
    );
}