"use client";

import React from "react";
import styles from "./createCourse.module.css";
import { COLORS } from "../../../constants/designTokens";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";
export default function CreateCourse() {
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
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar} style={{ backgroundColor: COLORS.footer }}>
                <div className={styles.sidebarTop}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon}></div>
                        E-tutor
                    </div>
                    <nav className={styles.navMenu}>
                        <div className={styles.navItem}>
                            <Link href="/dashboard">Dashboard</Link>
                        </div>
                        <div className={`${styles.navItem} ${styles.active}`}>
                            <span>Create New Course</span>
                        </div>
                        <div className={styles.navItem}>
                            <Link href="/courses">My Courses</Link>
                        </div>
                        <div className={styles.navItem}>
                            <span>Earning</span>
                        </div>
                        <div className={styles.navItem}>
                            <span>Message</span>
                        </div>
                        <div className={styles.navItem}>
                            <span>Settings</span>
                        </div>
                    </nav>
                </div>
                <div className={styles.sidebarBottom}>
                    <div className={styles.navItem}>
                        <span onClick={handleLogout}>Sign-out</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <span className={styles.greeting}>Hello,  {user?.name || "User"}</span>
                        <h1 className={styles.pageTitle}>Create a new course</h1>
                    </div>
                    <div className={styles.headerRight}>
                        {/* <div className={styles.searchBar}> */}
                        {/* <span className={styles.searchIcon}>🔍</span> */}
                        {/* <input type="text" placeholder="Search" className={styles.searchInput} /> */}
                        {/* </div> */}
                        {/* <div className={styles.bellIcon}>🔔</div> */}
                        <div className={styles.createBtn}>
                            {user?.name || "User"}
                        </div>
                    </div>
                </header>

                {/* Form Area */}
                <div className={styles.contentBody}>
                    <div className={styles.formContainer}>
                        {/* Tabs */}
                        <div className={styles.tabs}>
                            <div className={`${styles.tab} ${styles.active}`}>
                                Basic Information
                            </div>
                        </div>

                        {/* Section Content */}
                        <div className={styles.sectionContent}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>Basic Information</h2>
                            </div>

                            <form>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Course Name</label>
                                    <input type="text" placeholder="Your course title" className={styles.input} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Course Description</label>
                                    <input type="text" placeholder="Your course subtitle" className={styles.input} />
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Course Category</label>
                                            <select className={styles.input}>
                                                <option>Select...</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.col}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Category ID</label>
                                            <input type="text" placeholder="Enter Category ID" className={styles.input} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Instructor Name</label>
                                            <input type="text" placeholder="Instructor Name" className={styles.input} />
                                        </div>
                                    </div>
                                    <div className={styles.col}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Instructor Profile</label>
                                            <select className={styles.input}>
                                                <option>Select...</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col}>

                                        {/* <div className={styles.formGroup}> */}
                                        <label className={styles.label}>Pricing</label>
                                        <div style={{ display: "flex", gap: "10px" }}>

                                            <select className={styles.input} style={{ flex: 1 }}>
                                                <option>Rs.</option>
                                                <option>$</option>
                                            </select>
                                            <input type="text" placeholder="Amount" className={styles.input} style={{ flex: 2 }} />
                                        </div>
                                        {/* </div> */}
                                    </div>
                                    {/* <div className={styles.col}> */}
                                    {/* <div className={styles.formGroup}> */}
                                    {/* <label className={styles.label}>Subtitle Language (Optional)</label> */}
                                    {/* <select className={styles.input}> */}
                                    {/* <option>Select...</option> */}
                                    {/* </select> */}
                                    {/* </div> */}
                                    {/* </div> */}
                                    <div className={styles.col}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Course Rating</label>
                                            <select className={styles.input}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.col}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Durations</label>
                                            <div style={{ display: "flex", gap: "10px" }}>
                                                <input type="text" placeholder="Course durations" className={styles.input} style={{ flex: 2 }} />
                                                <select className={styles.input} style={{ flex: 1 }}>
                                                    <option>Day</option>
                                                    <option>Week</option>
                                                    <option>Month</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Footer */}
                                <div className={styles.footer}>
                                    {/* <button type="button" className={`${styles.btn} ${styles.btnCancel}`}>Cancel</button> */}
                                    <button type="button" className={`${styles.btn} ${styles.btnSaveNext}`}>Save & Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </main >
        </div >
    );
}
