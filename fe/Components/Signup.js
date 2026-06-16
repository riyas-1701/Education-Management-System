"use client";

import { useState } from "react";
import AuthLayout from "./AuthLayout";
import PasswordInput from "./PasswordInput";
import styles from "./auth.module.css";

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    username: form.username,
                    email: form.email,
                    password: form.password,
                }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Account created successfully!");
                window.location.href = "/signin";
            } else {
                alert(data.message || "Signup failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <AuthLayout
            navHint="Already have an account?"
            navLabel="Sign In"
            navHref="/signin"
        >
            <h1 className={styles.heading}>Create your account</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Name */}
                <div className={styles.fieldGroup}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name..."
                        className={styles.input}
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                    />
                </div>

                {/* Username */}
                <div className={styles.fieldGroup}>
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username..."
                        className={styles.input}
                        value={form.username}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                    />
                </div>

                {/* Email */}
                <div className={styles.fieldGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email address"
                        className={styles.input}
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </div>

                {/* Password + Confirm — side by side */}
                <div className={styles.twoCol}>
                    <PasswordInput
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="Create password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Confirm password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                </div>

                {/* Submit */}
                <div className={styles.submitRow}>
                    <button type="submit" className={styles.actionBtn}>
                        Create Account
                        <ArrowIcon />
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
}

const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);
