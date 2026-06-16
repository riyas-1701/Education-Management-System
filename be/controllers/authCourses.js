const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");
const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
    try {
        const {
            category_id,
            course_name,
            course_description,
            course_price,
            course_rating,
            course_duration,
            students_enrolled,
            instructor_id,
            instructor_name,
            instructor_profile,
            instructor_rating
        } = req.body;

        // Required fields validation
        if (
            !category_id ||
            !course_name ||
            !course_description ||
            !course_price ||
            !instructor_id ||
            !instructor_name ||
            !instructor_profile
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if course already exists
        const existingCourse = await Course.findOne({
            course_name: course_name.trim(),
        });

        if (existingCourse) {
            return res.status(409).json({
                success: false,
                message: "Course already exists",
            });
        }

        // Create course
        const course = await Course.create({
            category_id,
            course_name: course_name.trim(),
            course_description,
            course_price,
            course_rating,
            course_duration,
            students_enrolled,
            instructor_id,
            instructor_name,
            instructor_profile,
            instructor_rating,
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};