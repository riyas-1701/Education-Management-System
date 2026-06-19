const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");

exports.signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {
            return sendResponse.conflict(res, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign(
            {
                id: user._id, name: user.name, email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        sendResponse.success(res, "Signup Successful, Welcome to Dashboard!", {
            loggedInUser: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        return sendResponse.serverError(res, error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse.notFound(res, "User not found. Please signup!");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendResponse.unauthorized(res, "Invalid credentials");
        }

        const token = jwt.sign(
            {
                id: user._id, name: user.name, email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        sendResponse.success(res, "Login Successful", {
            loggedInUser: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        return sendResponse.serverError(res, error.message)
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,       // match exactly what you used when setting it
        sameSite: "strict",
    });
    sendResponse.success(res, "Logged out successfully");
}

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return sendResponse.notFound(res, "User not found");
        }
        sendResponse.success(res, "User fetched successfully", {
            loggedInUser: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        return sendResponse.serverError(res, error.message);
    }
};