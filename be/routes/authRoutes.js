const express = require("express");
const auth = require("../middleware/authMiddleware");
const { getCategories, createCategory } = require("../controllers/authCategories");
const { signup, login, logout, getMe } = require("../controllers/authController");
const { createCourse, getCourses, getDashboardData, getAllCourses, getAllInstructors, getCourseDetails } = require("../controllers/authCourses");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/create-category", createCategory);

router.get("/get-categories", getCategories);

router.post("/create-course", createCourse);

router.get("/get-courses", getDashboardData);

router.get("/get-all-courses", getAllCourses);

router.get("/get-all-instructors", getAllInstructors);

// router.get("/get-top-instructors", getTopInstructors);
router.post("/logout", logout);

router.get("/me", auth, getMe);

router.get("/course-details/:id", getCourseDetails)

module.exports = router;
