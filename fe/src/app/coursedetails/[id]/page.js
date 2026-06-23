import CourseDetails from "../../../../Components/CourseDetails/CourseDetails";



export default async function Details({ params }) {
    const { id } = await params;

    console.log("ID:", id);

    return (
        <CourseDetails id={id} />

    );
}