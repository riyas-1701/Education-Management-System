const express = require("express");
const auth = require("../middleware/authMiddleware");
const { getCategories, createCategory } = require("../controllers/authCategories");
const { signup, login } = require("../controllers/authController");
const { createCourse, getCourses, getDashboardData } = require("../controllers/authCourses");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/create-category", createCategory);

router.get("/get-categories", getCategories);

router.post("/create-course", createCourse);

router.get("/get-courses", getDashboardData);

// router.get("/get-top-instructors", getTopInstructors);

module.exports = router;
