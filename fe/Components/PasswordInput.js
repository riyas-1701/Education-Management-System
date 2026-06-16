"use client";

import { useState } from "react";
import styles from "./auth.module.css";

const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

/**
 * PasswordInput – labelled password field with show/hide toggle.
 *
 * Props: id, name, label, placeholder, value, onChange, autoComplete
 */
export default function PasswordInput({ id, name, label, placeholder, value, onChange, autoComplete = "current-password" }) {
    const [show, setShow] = useState(false);

    return (
        <div className={styles.fieldGroup}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <div className={styles.passwordWrapper}>
                <input
                    id={id}
                    name={name}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    className={styles.input}
                    value={value}
                    onChange={onChange}
                    required
                    autoComplete={autoComplete}
                />
                <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? `Hide ${label}` : `Show ${label}`}
                >
                    {show ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
        </div>
    );
}
