import styles from "./topInstructors.module.css";
import InstructorCard from "./InstructorCard";

export default function TopInstructors({ instructors = [] }) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>
                Top instructor of the month
            </h2>

            <div className={styles.grid}>
                {instructors?.map((instructor, index) => (
                    <InstructorCard
                        key={`${instructor?.instructor_name}-${index}`}
                        instructor={instructor}
                        index={index}
                    />
                ))}
            </div>

            <div className={styles.bottomText}>
                <span>
                    Thousands of students waiting for a instructor.
                    Start teaching & earning now!
                </span>

                <button className={styles.button}>
                    Become Instructor →
                </button>
            </div>
        </section>
    );
}