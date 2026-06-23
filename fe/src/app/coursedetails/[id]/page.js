import CourseDetails from "../../../../Components/CourseDetails/CourseDetails";
import RelatedCourses from "../../../../Components/CourseDetails/RelatedCourses";
import Navbar from "../../../../Components/Dashboard/Navbar";
import Footer from "../../../../Components/Dashboard/Footer";

export default async function Details({ params }) {
    const { id } = await params;

    console.log("ID:", id);

    return (
        <>
            <Navbar />
            <CourseDetails id={id} />
            <RelatedCourses currentCourseId={id} />
            <Footer />
        </>
    );
}