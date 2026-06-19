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
                    course_name: 1,
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
                    course_name: 1,
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
                    course_name: 1,
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
                $group: {
                    _id: "$instructor_name",
                    instructor_id: { $first: "$instructor_id" },
                    instructor_name: { $first: "$instructor_name" },
                    instructor_profile: { $first: "$instructor_profile" },
                    instructor_rating: {
                        $max: {
                            $toDouble: "$instructor_rating"
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
// exports.getDashboardData = async (req, res) => {
//     try {
//         const courses = await Course.aggregate([
//             {
//                 $lookup: {
//                     from: "categories",
//                     localField: "category_id",
//                     foreignField: "_id",
//                     as: "category"
//                 }
//             },
//             {
//                 $unwind: "$category"
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     category_name: "$category.category_name",
//                     course_name: 1,
//                     course_description: 1,
//                     course_price: 1,
//                     course_rating: 1,
//                     students_enrolled: 1
//                 }
//             },
//             {
//                 $limit: 12
//             }
//         ]);

//         return res.status(200).json({
//             success: true,
//             count: courses.length,
//             data: {
//                 bestSellingCourses,
//                 topRatedCourses,
//                 recentCourses
//             }
//         });
//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }
// };

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
                    course_name: 1,
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