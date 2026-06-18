// components/CourseCard/CourseCard.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { FiStar, FiUsers } from "react-icons/fi";
import styles from "./courseCard.module.css";

export default function CourseCard({ course, index }) {
    const imageIndex = index % 24;
    const {
        _id,
        course_name,
        category_name,
        course_price,
        course_rating,
        students_enrolled,
        course_description,
        course_image,

    } = course;

    return (
        <Link href={`/courses/${_id}`} className={styles.card}>
            <div className={styles.courseImage}>
                <Image
                    src={`/CourseImages/course-image-${imageIndex}.svg`}
                    alt={course_name}
                    fill
                    className={styles.thumb}
                />
            </div>

            <div className={styles.body}>
                <div className={styles.topRow}>
                    <span className={styles.category}>{category_name}</span>
                    <span className={styles.price}>${course_price}</span>
                </div>

                <h3 className={styles.title}>{course_name}</h3>
                {/* <h4 className={styles.description}>{course_description}</h4> */}
                <div className={styles.metaRow}>
                    <span className={styles.rating}>
                        <FiStar className={styles.starIcon} />
                        {course_rating?.toFixed(1)}
                    </span>
                    <span className={styles.students}>
                        <FiUsers size={14} />
                        {students_enrolled?.toLocaleString()} students
                    </span>
                </div>
            </div>
        </Link>
    );
}