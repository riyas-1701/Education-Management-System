require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const fix = async () => {
    try {
        await connectDB();
        const db = mongoose.connection.db;
        const courses = await db.collection('courses').find({}).toArray();
        let updatedCount = 0;

        const defaultCourseFor = [
            "This course is for those who want to launch a Freelance Web Design career.",
            "Those who are looking to reboot their work life and try a new profession that is fun, rewarding and highly in-demand.",
            "Anyone who wants to build a stunning portfolio and get hired as a professional designer.",
            "Students eager to learn best practices and modern techniques from industry experts.",
            "Professionals seeking to upgrade their skill sets and transition into Web Design."
        ];

        for (const course of courses) {
            let updates = {};
            let courseForArray = course.course_for;

            if (!courseForArray || courseForArray.length === 0) {
                courseForArray = defaultCourseFor;
            }

            updates.course_for = courseForArray.slice(0, 5).map(item => {
                if (typeof item === 'string') return { text: item };
                if (item && item.text) return item;
                return { text: String(item) };
            });

            await db.collection('courses').updateOne(
                { _id: course._id },
                { $set: updates }
            );
            updatedCount++;
        }

        console.log(`Successfully migrated ${updatedCount} courses, formatting course_for as objects.`);
        process.exit();
    } catch (error) {
        console.error('Error updating DB:', error);
        process.exit(1);
    }
};

fix();
