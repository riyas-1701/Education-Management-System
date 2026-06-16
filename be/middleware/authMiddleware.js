const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("token", token);

        if (!token) {
            return sendResponse.unauthorized(res, "Token Missing");
        }
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        return sendResponse.unauthorized(res, error.message);
    }
}

module.exports = auth;