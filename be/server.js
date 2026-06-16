require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db")
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes")

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
)

app.use(cookieParser());
app.use("/", authRoutes);

// GET API
app.get("/", (req, res) => {
    res.send("Hello Lily");
});

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});