"use client";

import styles from "./PatternSection.module.css";

export default function PatternSection({
    height = "300px",
    bgColor = "var(--gray100)",
    children,
    contained = true,
}) {
    return (
        <section
            className={styles.section}
            style={{
                minHeight: height,
                backgroundColor: bgColor,
            }}
        >
            {contained ? (
                <div className={styles.container}>{children}</div>
            ) : (
                children
            )}
        </section>
    );
}