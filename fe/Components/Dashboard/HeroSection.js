"use client";

import Image from "next/image";
import styles from "./hero.module.css";

export default function HeroSection({
    title = "Learn with expert anytime anywhere",
    description = "Our mission is to help people to find the best course online and learn with expert anytime, anywhere.",
    buttonText = "Create Account",
    imageSrc = "/Images.svg",
}) {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <h1 className={styles.heading}>
                        {title}
                    </h1>

                    <p className={styles.description}>
                        {description}
                    </p>

                    <button className={styles.ctaButton}>
                        {buttonText}
                    </button>
                </div>

                <div className={styles.right}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={imageSrc}
                            alt="Hero Banner"
                            fill
                            priority
                            className={styles.heroImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}