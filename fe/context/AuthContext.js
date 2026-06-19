// context/AuthContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [checked, setChecked] = useState(false); // prevents flash

    useEffect(() => {
        // On every page load, ask backend to verify cookie and return user info
        fetch("http://localhost:5000/me", {
            credentials: "include",
        })
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                setUser(data?.data?.loggedInUser || null);
                setChecked(true);
            })
            .catch(() => setChecked(true));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, checked }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);