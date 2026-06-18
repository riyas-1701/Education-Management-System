import Image from "next/image";
import styles from "./instructor.module.css";

export default function InstructorSection() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.leftCard}>
                <Image
                    src="/BecomeInstructor.svg"
                    alt="Become Instructor"
                    width={650}
                    height={300}
                    className={styles.instructorImage}
                    priority
                />

            </div>
            <div className={styles.rightCard}>
                <h2>Your teaching & earning steps</h2>

                <div className={styles.stepsGrid}>
                    <div className={styles.step}>
                        <span className={`${styles.circle} ${styles.one}`}>
                            1
                        </span>
                        <p>Apply to become instructor</p>
                    </div>

                    <div className={styles.step}>
                        <span className={`${styles.circle} ${styles.two}`}>
                            2
                        </span>
                        <p>Build & edit your profile</p>
                    </div>

                    <div className={styles.step}>
                        <span className={`${styles.circle} ${styles.three}`}>
                            3
                        </span>
                        <p>Create your new course</p>
                    </div>

                    <div className={styles.step}>
                        <span className={`${styles.circle} ${styles.four}`}>
                            4
                        </span>
                        <p>Start teaching & earning</p>
                    </div>
                </div>
            </div>
        </div>
    );
}