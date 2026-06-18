"use client";
import Image from "next/image";
import styles from "./instructorCard.module.css";
import Link from "next/link";
import { FiStar, FiUsers } from "react-icons/fi";
// import { Star } from "lucide-react";

export default function InstructorCard({ instructor, index = 0 }) {
    const imageIndex = index % 5;

    const {
        instructor_id,
        instructor_name,
        instructor_profile,
        instructor_rating,
    } = instructor;
    return (
        // <Link href={`/instructors/${_id}`} className={styles.card}></Link>
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={`/Instructors/Image-${imageIndex}.svg`}
                    alt={instructor_name}
                    fill
                    className={styles.image}
                />
            </div>

            <div className={styles.content}>
                <h3 className={styles.name}>{instructor_name}</h3>

                <p className={styles.role}>{instructor_profile}</p>
            </div>

            <div className={styles.footer}>
                <div className={styles.rating}>
                    {/* <Star size={14} fill="#f59e0b" stroke="#f59e0b" /> */}
                    <FiStar className={styles.starIcon} />
                    <span style={{ fontSize: "14px" }}>{instructor_rating}</span>
                </div>

                <span className={styles.students}>
                    423 students
                </span>
            </div>
        </div >
    );
}