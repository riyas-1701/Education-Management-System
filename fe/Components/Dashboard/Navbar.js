"use client";
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
                <button className={styles.iconBtn}><FiBell /></button>
                <button className={styles.iconBtn}><FiHeart /></button>
                <button className={styles.iconBtn}><FiShoppingCart /></button>

                {user ? (
                    <>
                        <button className={styles.createBtn}>
                            {user.name}
                        </button>

                        <button
                            className={styles.signInBtn}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
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