"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import PasswordInput from "./PasswordInput";
import styles from "./auth.module.css";
import { useAuth } from "../../context/AuthContext";

export default function Signin() {
    const router = useRouter();
    const { user, setUser, checked } = useAuth() || {};
    const [form, setForm] = useState({ email: "", password: "" });

    useEffect(() => {
        if (checked && user) {
            router.replace("/dashboard");
        }
    }, [checked, user, router]);

    // Prevent flash of the form if checking or already logged in
    if (!checked || user) {
        return null; 
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email: form.email, password: form.password }),
            });
            const data = await res.json();
            if (data.success) {
                if (setUser) setUser(data?.data?.loggedInUser);
                router.replace("/dashboard"); //can't go back
                // router.push -- can go back
            } else {
                alert(data.message || "Login failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <AuthLayout
            navHint="Don't have account?"
            navLabel="Create Account"
            navHref="/signup"
        >
            <h1 className={styles.heading}>Sign in to your account</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Email */}
                <div className={styles.fieldGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Username or email address..."
                        className={styles.input}
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </div>

                {/* Password */}
                <PasswordInput
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                />

                {/* Submit */}
                <div className={styles.submitRow}>
                    <button type="submit" className={styles.actionBtn}>
                        Sign In
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
