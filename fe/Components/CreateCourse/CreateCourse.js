"use client";

import React, { useState } from "react";
import styles from "./createCourse.module.css";
import { COLORS } from "../../constants/designTokens";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateCourse() {
    const { user, setUser } = useAuth() || {};
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("basic"); // "basic" | "advanced"

    const [formData, setFormData] = useState({
        category_id: "",
        course_category: "",
        course_title: "",
        course_subtitle: "",
        instructor_name: "",
        instructor_profile: "",
        instructor_description: "",
        course_price: "",
        course_rating: "1",
        course_duration: "",
        course_level: "",
        course_description: "",
        course_for: [{ text: "" }],
    });

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCourseForChange = (index, value) => {
        const newCourseFor = [...formData.course_for];
        newCourseFor[index] = { text: value };
        setFormData({ ...formData, course_for: newCourseFor });
    };

    const addCourseFor = () => {
        if (formData.course_for.length < 5) {
            setFormData({ ...formData, course_for: [...formData.course_for, { text: "" }] });
        }
    };

    const removeCourseFor = (indexToRemove) => {
        if (formData.course_for.length > 1) {
            const newCourseFor = formData.course_for.filter((_, index) => index !== indexToRemove);
            setFormData({ ...formData, course_for: newCourseFor });
        }
    };

    const handleSaveNext = () => {
        setActiveTab("advanced");
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...formData,
                // instructor_description: "An experienced instructor passionate about teaching.",
                // course_price: Number(formData.course_price) || 0,
                // course_rating: Number(formData.course_rating) || 1,
            };

            const response = await fetch("http://localhost:5000/create-course", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.success) {
                alert("Course created successfully!");
                router.push("/courses");
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Submit error", error);
            alert("Failed to submit course");
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
                            <div
                                className={`${styles.tab} ${activeTab === "basic" ? styles.active : ""}`}
                                onClick={() => setActiveTab("basic")}
                            >
                                Basic Information
                            </div>
                            <div
                                className={`${styles.tab} ${activeTab === "advanced" ? styles.active : ""}`}
                                onClick={() => setActiveTab("advanced")}
                            >
                                Advanced Information
                            </div>
                        </div>

                        {/* Section Content */}
                        <div className={styles.sectionContent}>
                            {activeTab === "basic" && (
                                <>
                                    <div className={styles.sectionHeader}>
                                        <h2 className={styles.sectionTitle}>Basic Information</h2>
                                    </div>
                                    <form>
                                        <div className={styles.row}>
                                            <div className={styles.col}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Course Category</label>
                                                    <select name="course_category" value={formData.course_category} onChange={handleChange} className={styles.input}>
                                                        <option value="">Select...</option>
                                                        <option value="Business">Business</option>
                                                        <option value="Finance & Accounting">Finance & Accounting</option>
                                                        <option value="IT & Software">IT & Software</option>
                                                        <option value="Personal Development">Personal Development</option>
                                                        <option value="Office Productivity">Office Productivity</option>
                                                        <option value="Marketing">Marketing</option>
                                                        <option value="Photography & Video">Photography & Video</option>
                                                        <option value="Lifestyle">Lifestyle</option>
                                                        <option value="Design">Design</option>
                                                        <option value="Health & Fitness">Health & Fitness</option>
                                                        <option value="Music">Music</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.row}>
                                            <div className={styles.col}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Course Title</label>
                                                    <input type="text" name="course_title" value={formData.course_title} onChange={handleChange} placeholder="Your course title" className={styles.input} />
                                                </div>
                                            </div>
                                            <div className={styles.col}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Course Subtitle</label>
                                                    <input type="text" name="course_subtitle" value={formData.course_subtitle} onChange={handleChange} placeholder="Your course subtitle" className={styles.input} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Course Description</label>
                                            <textarea
                                                name="course_description"
                                                value={formData.course_description}
                                                onChange={handleChange}
                                                placeholder="Enter course description"
                                                className={styles.input}
                                                style={{ minHeight: "150px", resize: "vertical", fontFamily: "inherit" }}
                                            />
                                        </div>

                                        <div className={styles.row}>
                                            <div className={styles.col}>
                                                <label className={styles.label}>Pricing</label>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <select className={styles.input} style={{ flex: 1 }}>
                                                        <option>Rs.</option>
                                                        <option>$</option>
                                                    </select>
                                                    <input type="text" name="course_price" value={formData.course_price} onChange={handleChange} placeholder="Amount" className={styles.input} style={{ flex: 2 }} />
                                                </div>
                                            </div>
                                            <div className={styles.col}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Course Rating</label>
                                                    <select name="course_rating" value={formData.course_rating} onChange={handleChange} className={styles.input}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={styles.col}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Course Level</label>
                                                    <select name="course_level" value={formData.course_level} onChange={handleChange} className={styles.input}>
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Intermediate">Intermediate</option>
                                                        <option value="Advanced">Advanced</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={styles.col}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Durations</label>
                                                    <div style={{ display: "flex", gap: "10px" }}>
                                                        <input type="text" name="course_duration" value={formData.course_duration} onChange={handleChange} placeholder="Course durations" className={styles.input} style={{ flex: 2 }} />
                                                        <select className={styles.input} style={{ flex: 1 }}>
                                                            <option value="Day">Day</option>
                                                            <option value="Week">Week</option>
                                                            <option value="Month">Month</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Form Footer */}
                                        <div className={styles.footer} style={{ justifyContent: "flex-end" }}>
                                            <button type="button" onClick={handleSaveNext} className={`${styles.btn} ${styles.btnSaveNext}`}>Save & Next</button>
                                        </div>
                                    </form>
                                </>
                            )}

                            {activeTab === "advanced" && (
                                <>
                                    <div className={styles.sectionHeader}>
                                        <h2 className={styles.sectionTitle}>Advanced Information</h2>
                                    </div>
                                    <form>
                                        <div className={styles.row}>
                                            <div className={styles.col}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Instructor Name</label>
                                                    <select name="instructor_name" value={formData.instructor_name} onChange={handleChange} placeholder="Instructor Name" className={styles.input}>
                                                        <option value="">Select Instructor Name</option>
                                                        <option value="Damon">Damon</option>
                                                        <option value="Stefan">Stefan</option>
                                                        <option value="Michael">Michael</option>
                                                        <option value="Elena">Elena</option>
                                                        <option value="Katherine">Katherine</option>
                                                        <option value="Jessica">Jessica</option>
                                                        <option value="Aman">Aman</option>
                                                        <option value="Klaus">Klaus</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className={styles.col}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Instructor Profile</label>
                                                    <select name="instructor_profile" value={formData.instructor_profile} onChange={handleChange} className={styles.input}>
                                                        <option value="">Select...</option>
                                                        <option value="Software Developer">Software Developer</option>
                                                        <option value="DevOps">DevOps</option>
                                                        <option value="UI/UX Designer">UI/UX Designer</option>
                                                        <option value="Backend Developer">Backend Developer</option>
                                                        <option value="Frontend Developer">Frontend Developer</option>
                                                        <option value="Java Developer">Java Developer</option>
                                                        <option value="Senior Developer">Senior Developer</option>
                                                        <option value="Tech Lead">Tech Lead</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Instructor Description</label>
                                            <textarea
                                                name="instructor_description"
                                                value={formData.instructor_description}
                                                onChange={handleChange}
                                                placeholder="Enter instructor description"
                                                className={styles.input}
                                                style={{ minHeight: "100px", resize: "vertical", fontFamily: "inherit" }}
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>What this Course is for ({formData.course_for.length}/5)</span>
                                                {formData.course_for.length < 5 && (
                                                    <button type="button" onClick={addCourseFor} style={{ background: 'none', border: 'none', color: '#FF6636', cursor: 'pointer', fontWeight: 600 }}>
                                                        + Add new
                                                    </button>
                                                )}
                                            </label>

                                            {formData.course_for.map((item, index) => (
                                                <div key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <span style={{ color: "#8C94A3", fontSize: "14px", minWidth: "20px" }}>0{index + 1}</span>
                                                    <input
                                                        type="text"
                                                        placeholder="Who this course is for..."
                                                        className={styles.input}
                                                        value={item.text}
                                                        onChange={(e) => handleCourseForChange(index, e.target.value)}
                                                        style={{ flex: 1 }}
                                                    />
                                                    {formData.course_for.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCourseFor(index)}
                                                            style={{ background: 'none', border: 'none', color: '#FF6636', cursor: 'pointer', fontSize: '18px', padding: '0 5px' }}
                                                            title="Remove"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Form Footer */}
                                        <div className={styles.footer}>
                                            <button type="button" onClick={() => setActiveTab("basic")} className={`${styles.btn} ${styles.btnCancel}`}>Previous</button>
                                            <button type="button" onClick={handleSubmit} className={`${styles.btn} ${styles.btnSaveNext}`}>Submit</button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
