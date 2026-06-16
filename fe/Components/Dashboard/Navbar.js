"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            {/* Logo */}
            <div className={styles.logoSection}>
                <Image
                    src="/GraduationCap.svg"
                    alt="E-tutor"
                    width={34}
                    height={34}
                />
                <span className={styles.logoText}>E-tutor</span>
            </div>

            {/* Browse Dropdown */}
            <div className={styles.browseContainer}>
                <select className={styles.browseSelect}>
                    <option>Browse</option>
                    <option>Business</option>
                    <option>Design</option>
                    <option>IT & Software</option>
                    <option>Marketing</option>
                </select>
            </div>

            {/* Search */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="What do you want learn..."
                    className={styles.searchInput}
                />
            </div>

            {/* Right Actions */}
            <div className={styles.actions}>
                <button className={styles.iconBtn}>🔔</button>
                <button className={styles.iconBtn}>♡</button>
                <button className={styles.iconBtn}>🛒</button>

                <Link href="/signup" className={styles.createBtn}>
                    Create Account
                </Link>

                <Link href="/signin" className={styles.signInBtn}>
                    Sign In
                </Link>
            </div>
        </nav>
    );
}