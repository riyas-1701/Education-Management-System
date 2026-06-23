"use client";
import { useState } from "react";
import {
    FiBell,
    FiHeart,
    FiShoppingCart,
    FiSearch
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const { user, setUser } = useAuth() || {};
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:5000/logout", {
                method: "POST",
                credentials: "include",
            });
            if (setUser) setUser(null);
        } catch (error) {
            console.error("Logout error", error);
        }
    };

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
                <Link href="/dashboard" className={styles.logoText}>E-tutor</Link>
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
                <button className={styles.iconBtn}><FiBell /></button>
                <button className={styles.iconBtn}><FiHeart /></button>
                <button className={styles.iconBtn}><FiShoppingCart /></button>

                {user ? (
                    <>
                        <div className={styles.userProfileContainer}>
                            <button
                                className={styles.userLogo}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </button>

                            {dropdownOpen && (
                                <div className={styles.dropdownMenu}>
                                    <Link
                                        href="/create-course"
                                        className={styles.dropdownItem}
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            handleLogout();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link href="/signup" className={styles.createBtn}>
                            Create Account
                        </Link>

                        <Link href="/signin" className={styles.signInBtn}>
                            Sign In
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}