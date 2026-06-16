"use client";

import Image from "next/image";
import styles from "./auth.module.css";

/**
 * AuthLayout – shared page shell for Signin & Signup.
 *
 * Props:
 *  navHint    {string}  – text beside the nav button  ("Don't have account?")
 *  navLabel   {string}  – nav button label             ("Create Account")
 *  navHref    {string}  – nav button link              ("/signup")
 *  children   {node}    – the form card content
 */
export default function AuthLayout({ navHint, navLabel, navHref, children }) {
    return (
        <div className={styles.page}>
            {/* ── Navbar ── */}
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <Image src="/GraduationCap.svg" alt="E-tutor logo" width={41} height={40} />
                    <span className={styles.logoText}>E-tutor</span>
                </div>
                <div className={styles.navRight}>
                    <span className={styles.navHint}>{navHint}</span>
                    <a href={navHref} className={styles.navBtn}>{navLabel}</a>
                </div>
            </nav>

            {/* ── Body ── */}
            <main className={styles.main}>
                {/* Left panel with illustration */}
                <div className={styles.leftPanel}>
                    <Image
                        src="/signup.svg"
                        alt="E-tutor illustration"
                        fill
                        style={{ objectFit: "contain", objectPosition: "center bottom" }}
                        priority
                    />
                </div>

                {/* Right panel – form injected here */}
                <div className={styles.rightPanel}>
                    <div className={styles.formCard}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
