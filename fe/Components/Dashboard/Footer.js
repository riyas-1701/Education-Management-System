"use client";
import Image from "next/image";

export default function Footer() {
    return (
        <footer style={{ position: "relative", width: "100%", height: "400px" }}>
            <Image
                src="/Footer.svg"
                alt="Footer Background"
                fill
                style={{ objectFit: "cover" }}
            />
        </footer>
    );
}