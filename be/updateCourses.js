require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Course = require('./models/Course');

const updateCourses = async () => {
    try {
        await connectDB();

        // Use raw collection to find documents that might have course_name instead of course_title
        const db = mongoose.connection.db;
        const courses = await db.collection('courses').find({}).toArray();

        console.log(`Found ${courses.length} courses to update.`);

        let updatedCount = 0;

        for (const course of courses) {
            const updates = {};
            const unsets = {};

            // Map course_name to course_title if it exists
            if (course.course_name && !course.course_title) {
                updates.course_title = course.course_name;
                unsets.course_name = "";
            }

            // Fill missing required fields with mock data
            if (!course.course_subtitle) {
                updates.course_subtitle = "Learn everything you need to know in this comprehensive course.";
            }
            if (!course.course_description || course.course_description.length < 500) {
                updates.course_description = "This is an in-depth and comprehensive course. It covers all the essential topics, modern industry practices, and provides hands-on exercises to ensure you master the subject completely. Perfect for all skill levels. In this course, you will learn the foundational concepts, explore advanced methodologies, and build real-world projects from scratch. Whether you are a beginner looking to enter the field or an experienced professional wanting to upgrade your skills, this course offers valuable insights and practical knowledge that will propel your career forward. We have carefully structured the curriculum to provide a seamless learning experience, with clear explanations, practical examples, and interactive assignments. Join thousands of students who have already transformed their careers through this comprehensive program and start your journey towards mastery today.";
            }
            if (!course.course_level) {
                updates.course_level = "Beginner";
            }
            if (!course.instructor_description) {
                updates.instructor_description = "An experienced professional with over 10 years of industry experience. Passionate about teaching and sharing knowledge with the community to help aspiring developers and designers reach their goals. I have built numerous successful projects and helped thousands of students worldwide.";
            }

            if (!course.instructor_name) {
                updates.instructor_name = "Damon";
            }

            if (!course.instructor_profile) {
                updates.instructor_profile = "Software Developer";
            }

            const updateOp = {};
            if (Object.keys(updates).length > 0) updateOp.$set = updates;
            if (Object.keys(unsets).length > 0) updateOp.$unset = unsets;

            if (Object.keys(updateOp).length > 0) {
                await db.collection('courses').updateOne(
                    { _id: course._id },
                    updateOp
                );
                updatedCount++;
            }
        }

        console.log(`Successfully updated ${updatedCount} courses with missing fields and mock data!`);
        process.exit();
    } catch (error) {
        console.error('Error updating courses:', error);
        process.exit(1);
    }
};

updateCourses();
