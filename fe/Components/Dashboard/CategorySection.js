// components/CategorySection/CategorySection.js
"use client";

import {
    FiTag,
    FiBriefcase,
    FiDollarSign,
    FiCode,
    FiUser,
    FiClipboard,
    FiTrendingUp,
    FiCamera,
    FiCoffee,
    FiEdit3,
    FiHeart,
    FiMusic,
} from "react-icons/fi";
import Link from "next/link";
import styles from "./category.module.css";

// Hardcoded category data — icon + color come from here, not the DB.
// course_count and category_name/_id come from your Category collection via API.
const categoryMeta = {
    Label: { icon: FiTag, color: "purple" },
    Business: { icon: FiBriefcase, color: "green" },
    "Finance & Accounting": { icon: FiDollarSign, color: "orange" },
    "IT & Software": { icon: FiCode, color: "pink" },
    "Personal Development": { icon: FiUser, color: "solidOrange" },
    "Office Productivity": { icon: FiClipboard, color: "gray" },
    Marketing: { icon: FiTrendingUp, color: "blue" },
    "Photography & Video": { icon: FiCamera, color: "lightGray" },
    Lifestyle: { icon: FiCoffee, color: "peach" },
    Design: { icon: FiEdit3, color: "rose" },
    "Health & Fitness": { icon: FiHeart, color: "mint" },
    Music: { icon: FiMusic, color: "cream" },
};

export default function CategorySection({ categories = [] }) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Browse top category</h2>

                <div className={styles.grid}>
                    {categories.map((cat) => {
                        const meta = categoryMeta[cat.category_name] || {
                            icon: FiTag,
                            color: "gray",
                        };
                        const Icon = meta.icon;

                        return (
                            <Link
                                key={cat._id}
                                href={`/courses/category/${cat._id}`}
                                className={styles.card}
                            >
                                <div className={`${styles.iconBox} ${styles[meta.color]}`}>
                                    <Icon size={20} />
                                </div>
                                <div className={styles.cardText}>
                                    <p className={styles.categoryName}>{cat.category_name}</p>
                                    <p className={styles.courseCount}>
                                        {cat.course_count?.toLocaleString() || 0} Courses
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <p className={styles.footerText}>
                    We have more category & subcategory.{" "}
                    <Link href="/courses" className={styles.browseAll}>
                        Browse All →
                    </Link>
                </p>
            </div>
        </section>
    );
}