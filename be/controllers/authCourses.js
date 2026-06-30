const mongoose = require('mongoose');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");
const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
    try {
        const {
            course_category,
            course_title,
            course_subtitle,
            course_description,
            course_for,
            course_price,
            course_rating,
            course_level,
            course_duration,
            students_enrolled,
            instructors
        } = req.body;

        // Required fields validation
        if (
            !course_category ||
            !course_title ||
            !course_subtitle ||
            !course_description ||
            !course_price ||
            !instructors ||
            !instructors.length
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required, including at least one instructor",
            });
        }

        // Find the category by name
        const categoryDoc = await Category.findOne({ category_name: course_category });
        if (!categoryDoc) {
            return res.status(400).json({
                success: false,
                message: "Invalid category. Please select a valid course category.",
            });
        }

        // Check if course already exists
        const existingCourse = await Course.findOne({
            course_title: course_title.trim(),
        });

        if (existingCourse) {
            return res.status(409).json({
                success: false,
                message: "Course already exists",
            });
        }

        // Create course
        const course = await Course.create({
            category_id: categoryDoc._id,
            course_title: course_title.trim(),
            course_subtitle,
            course_description,
            course_for,
            course_price,
            course_rating,
            course_level,
            course_duration,
            students_enrolled,
            instructors,
            instructor_id: req.user.id,
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
exports.getDashboardData = async (req, res) => {
    try {
        const bestSellingCourses = await Course.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $addFields: {
                    course_price: {
                        $toDouble: "$course_price"
                    }
                }
            },
            {
                $sort: {
                    course_price: -1
                }
            },
            {
                $limit: 12
            },
            {
                $project: {
                    _id: 1,
                    category_name: "$category.category_name",
                    course_title: 1,
                    course_description: 1,
                    course_price: 1,
                    course_rating: 1,
                    students_enrolled: 1,
                    course_image: 1
                }
            }
        ]);

        const topRatedCourses = await Course.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $sort: {
                    course_rating: -1
                }
            },
            {
                $limit: 8
            },
            {
                $project: {
                    _id: 1,
                    category_name: "$category.category_name",
                    course_title: 1,
                    course_description: 1,
                    course_price: 1,
                    course_rating: 1,
                    students_enrolled: 1,
                    course_image: 1
                }
            }
        ]);

        const recentCourses = await Course.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: 8
            },
            {
                $project: {
                    _id: 1,
                    category_name: "$category.category_name",
                    course_title: 1,
                    course_description: 1,
                    course_price: 1,
                    course_rating: 1,
                    students_enrolled: 1,
                    course_image: 1
                }
            }
        ]);

        const instructors = await Course.aggregate([
            {
                $unwind: "$instructors"
            },
            {
                $group: {
                    _id: "$instructors.instructor_name",
                    instructor_id: { $first: "$instructor_id" },
                    instructor_name: { $first: "$instructors.instructor_name" },
                    instructor_profile: { $first: "$instructors.instructor_profile" },
                    instructor_rating: {
                        $max: {
                            $toDouble: "$instructors.instructor_rating"
                        }
                    }
                }
            },
            {
                $sort: {
                    instructor_rating: -1
                }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 0,
                    instructor_id: 1,
                    instructor_name: 1,
                    instructor_profile: 1,
                    instructor_rating: 1
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            data: {
                bestSellingCourses,
                topRatedCourses,
                recentCourses,
                instructors
            }
        });

    } catch (error) {
        console.error("Dashboard Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    _id: 1,
                    category_name: "$category.category_name",
                    course_title: 1,
                    course_description: 1,
                    course_price: 1,
                    course_rating: 1,
                    students_enrolled: 1,
                    course_image: 1,
                    createdAt: 1
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            data: courses
        });

    } catch (error) {
        console.error("Get All Courses Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllInstructors = async (req, res) => {
    try {
        const instructors = await Course.aggregate([
            {
                $unwind: "$instructors"
            },
            {
                $group: {
                    _id: "$instructors.instructor_name",
                    instructor_id: { $first: "$instructor_id" },
                    instructor_name: { $first: "$instructors.instructor_name" },
                    instructor_profile: { $first: "$instructors.instructor_profile" },
                    instructor_rating: {
                        $max: {
                            $toDouble: "$instructors.instructor_rating"
                        }
                    }
                }
            },
            {
                $sort: {
                    instructor_rating: -1
                }
            },
            {
                $project: {
                    _id: 0,
                    instructor_id: 1,
                    instructor_name: 1,
                    instructor_profile: 1,
                    instructor_rating: 1
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            data: instructors
        });

    } catch (error) {
        console.error("Get All Instructors Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getCourseDetails = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('category_id');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        console.log("coursecoursecourse ::::::::: ", course)
        return res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        console.error("Get Course Details Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getMyCourses = async (req, res) => {
    try {
        const courses = await Course.aggregate([
            { $match: { instructor_id: new mongoose.Types.ObjectId(req.user.id) } },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: "$category" },
            { $sort: { createdAt: -1 } },
            {
                $project: {
                    _id: 1,
                    category_name: "$category.category_name",
                    course_title: 1,
                    course_description: 1,
                    course_price: 1,
                    course_rating: 1,
                    students_enrolled: 1,
                    course_image: 1,
                    createdAt: 1
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            data: courses
        });

    } catch (error) {
        console.error("Get My Courses Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
