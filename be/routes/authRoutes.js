const express = require("express");
const auth = require("../middleware/authMiddleware");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

// router.get("/users", auth, getAllUsers);

module.exports = router;
