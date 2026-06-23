"use client";
import { useEffect, useState } from "react";
import PatternSection from "../../../Components/Pattern/PatternSection";
import { COLORS } from "../../../constants/designTokens";
import CategorySection from "../../../Components/Dashboard/CategorySection";
import HeroSection from "../../../Components/Dashboard/HeroSection";
import Navbar from "../../../Components/Dashboard/Navbar";
import CourseGrid from "../../../Components/Dashboard/CourseGrid";
import Link from "next/link";
import InstructorSection from "../../../Components/Dashboard/InstructorSection";
import TopInstructors from "../../../Components/Dashboard/TopInstructors";
import Footer from "../../../Components/Dashboard/Footer"
export default function DashboardUI() {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [bestSellingCourses, setBestSellingCourses] = useState([]);
    const [topRatedCourses, setTopRatedCourses] = useState([]);
    const [recentCourses, setRecentCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchCourses();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/get-categories", { credentials: "include" }
            );

            const result = await response.json();
            console.log(result);

            if (result.success) {
                setCategories(result.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoadingCategories(false);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/get-courses",
                { credentials: "include" }
            );

            const result = await response.json();
            console.log(result);

            if (result.success) {
                setBestSellingCourses(result.data.bestSellingCourses);
                setRecentCourses(result.data.recentCourses);
                setInstructors(result.data.instructors);
                console.log("instructors:", result.data.instructors)
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoadingCourses(false);
        }
    };

    if (loadingCategories || loadingCourses) {
        return <h2>Loading...</h2>;
    }
    // console.log("courses data:", courses);
    return (
        <>
            <Navbar />

            {/* Full-width Hero */}
            <PatternSection
                height="500px"
                bgColor={COLORS.lightgrey}
                contained={false}
            >
                <HeroSection />
            </PatternSection>

            {/* Containerized Sections */}
            <PatternSection
                height="500px"
                bgColor={COLORS.white}
            >
                <CategorySection categories={categories} />
            </PatternSection>

            <PatternSection
                height="500px"
                bgColor={COLORS.lightgrey}
            >
                <CourseGrid
                    title="Best Selling Courses"
                    courses={bestSellingCourses}
                    browseAllLink="/courses?priceSort=highToLow"
                />
            </PatternSection>
            <PatternSection
                height="auto"
                bgColor={COLORS.white}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CourseGrid
                        title="Recently Added Courses"
                        courses={recentCourses}
                        showButton={true}
                        browseAllLink="/courses?recentlyAdded=true"
                    />
                </div> 
            </PatternSection>
            <PatternSection
                height="250px"
                bgColor={COLORS.lightgrey}
            >
                <InstructorSection />
            </PatternSection>
            <PatternSection
                height="500px"
                bgColor={COLORS.white}
            >
                <TopInstructors instructors={instructors} />
            </PatternSection>

            <Footer />


        </>
    );
}




