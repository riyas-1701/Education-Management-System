// components/CourseGrid/CourseGrid.js
"use client";
import CourseCard from "./CourseCard";
import styles from "./courseGrid.module.css";

export default function CourseGrid({ title, courses = [], showButton = false }) {
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

            {showButton && <button style={{
                "marginTop": "28px",
                "text-decoration": "none",
                "background": "#fff0eb",
                "color": "#ff6636",
                "padding": "12px 18px",
                "font-size": "14px",
                "font-weight": 600,
                "textAlign": "center"
            }}>
                Browse All
            </button>}
        </section >
    );
}