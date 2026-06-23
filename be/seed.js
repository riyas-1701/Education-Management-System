require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Category = require('./models/Category');
const Course = require('./models/Course');

const seedData = async () => {
    try {
        await connectDB();
        
        // Clear existing data (optional, remove if you want to keep existing data)
        await User.deleteMany();
        await Category.deleteMany();
        await Course.deleteMany();

        console.log('Existing data cleared');

        // Create some dummy users
        const users = [
            { name: 'Admin User', username: 'admin', email: 'admin@test.com', password: 'password123' },
            { name: 'Instructor User', username: 'instructor', email: 'instructor@test.com', password: 'password123' }
        ];
        const createdUsers = await User.insertMany(users);
        const instructorId = createdUsers[0]._id;

        // Create Categories
        const categoryNames = ['Business', 'Finance & Accounting', 'IT & Software', 'Personal Development',
            'Office Productivity', 'Marketing', 'Photography & Video', 'Lifestyle',
            'Design', 'Health & Fitness', 'Music'];

        const categories = categoryNames.map(name => ({ category_name: name, course_count: 0 }));
        const createdCategories = await Category.insertMany(categories);
        
        // Helper function to get a random item from array
        const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        // Instructors data based on enums in schema
        const instructorNames = ['Damon', 'Stefen', 'Klaus', 'Michael', 'Elena', 'Katherine', 'Jessica', 'Aman'];
        const instructorProfiles = ['Software Developer', 'DevOps', 'UI/UX Designer', 'Backend Developer', 'Frontend Developer', 'Java Developer', 'Senior Developer', 'Tech Lead'];

        const coursePrefixes = ['Masterclass in', 'The Complete Guide to', 'Advanced Techniques in', 'Introduction to', 'Crash Course:'];
        
        // Create 30 Courses
        const courses = [];
        for (let i = 1; i <= 30; i++) {
            const category = getRandom(createdCategories);
            courses.push({
                category_id: category._id,
                course_title: `${getRandom(coursePrefixes)} ${category.category_name} - Edition ${i}`,
                course_subtitle: `Learn everything you need to know about ${category.category_name} in this comprehensive course.`,
                course_description: `This is an in-depth and comprehensive course about ${category.category_name}. It covers all the essential topics, modern industry practices, and provides hands-on exercises to ensure you master the subject completely. Perfect for all skill levels. In this course, you will learn the foundational concepts, explore advanced methodologies, and build real-world projects from scratch. Whether you are a beginner looking to enter the field or an experienced professional wanting to upgrade your skills, this course offers valuable insights and practical knowledge that will propel your career forward. We have carefully structured the curriculum to provide a seamless learning experience, with clear explanations, practical examples, and interactive assignments. Join thousands of students who have already transformed their careers through this comprehensive program and start your journey towards mastery today.`,
                course_price: Math.floor(Math.random() * 150) + 10,
                course_rating: Number((Math.random() * 2 + 3).toFixed(1)), // Rating between 3.0 and 5.0
                course_level: getRandom(['Beginner', 'Intermediate', 'Advanced']),
                course_duration: Math.floor(Math.random() * 50) + 2, // 2 to 52 hours
                students_enrolled: Math.floor(Math.random() * 15000),
                instructor_id: instructorId,
                instructor_name: getRandom(instructorNames),
                instructor_profile: getRandom(instructorProfiles),
                instructor_description: `An experienced ${getRandom(instructorProfiles)} with over 10 years of industry experience. Passionate about teaching and sharing knowledge with the community to help aspiring developers and designers reach their goals. I have built numerous successful projects and helped thousands of students worldwide.`,
                instructor_rating: Number((Math.random() * 2 + 3).toFixed(1))
            });
        }

        await Course.insertMany(courses);
        console.log(`Successfully created ${courses.length} courses!`);

        // Update category course_count
        for (let cat of createdCategories) {
            const count = await Course.countDocuments({ category_id: cat._id });
            await Category.updateOne({ _id: cat._id }, { course_count: count });
        }

        console.log('Categories updated with accurate course counts!');
        console.log('Database seeding completed successfully!');
        process.exit();

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
