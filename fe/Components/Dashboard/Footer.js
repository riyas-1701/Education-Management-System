"use client";
import Image from "next/image";

export default function Footer() {
    return (
        <footer>
            <img
                src="/Footer.svg"
                alt="Footer"
                style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                }}
            />
        </footer>
    );
}