const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category ID is required']
    },
    course_title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        minlength: [3, 'Course title must be at least 3 characters'],
        maxlength: [150, 'Course title cannot exceed 50 characters']
    },
    course_subtitle: {
        type: String,
        required: [true, 'Course subtitle is required'],
        trim: true,
        minlength: [3, 'Course subtitle must be at least 3 characters'],
        maxlength: [150, 'Course subtitle cannot exceed 50 characters']
    },
    course_description: {
        type: String,
        required: [true, 'Course description is required'],
        trim: true,
        minlength: [500, 'Description must be at least 500 characters']
    },
    course_learning: {
        type: [String],
        default: [
            "You will learn how to design beautiful websites using Figma, an interface design tool used by designers at Uber, Airbnb and Microsoft.",
            "You will learn how to take your designs and build them into powerful websites using Webflow, a state of the art site builder used by teams at Dell, NASA and more.",
            "You will learn secret tips of Freelance Web Designers and how they make great money freelancing online.",
            "Learn to use Python professionally, learning both Python 2 and Python 3!",
            "Understand how to use both the Jupyter Notebook and create .py files",
            "Get an understanding of how to create GUIs in the Jupyter Notebook system!"
        ]
    },
    course_for: {
        type: [{
            text: {
                type: String,
                required: [true, 'Line text is required'],
                trim: true
            }
        }],
        validate: {
            validator: function (val) {
                return val.length <= 5;
            },
            message: 'Course for section can have a maximum of 5 lines'
        }
    },
    course_price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: [0, 'Price cannot be negative']
    },
    course_rating: {
        type: Number,
        required: [true, 'Course rating is required'],
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot exceed 5'],
        default: 3
    },
    course_level: {
        type: String,
        trim: true,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: "Beginner"
    },
    course_duration: {
        type: Number,
        required: [true, 'Course duration is required'],
        default: 1,
        min: [1, 'Duration must be at least 1 hour']
    },
    students_enrolled: {
        type: Number,
        required: [true, 'Students enrolled count is required'],
        min: [0, 'Students enrolled cannot be negative'],
        default: 93
    },
    instructor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    instructor_name: {
        type: String,
        required: false,
        trim: true,
        enum: ['Damon', 'Stefen', 'Klaus', 'Michael', 'Elena', 'Katherine', 'Jessica', 'Aman']
    },
    instructor_profile: {
        type: String,
        required: false,
        trim: true,
        enum: ['Software Developer', 'DevOps', 'UI/UX Designer', 'Backend Developer', 'Frontend Developer', 'Java Developer', 'Senior Developer', 'Tech Lead']
    },
    instructor_description: {
        type: String,
        required: [true, 'Instructor description is required'],
        trim: true,
        minlength: [200, 'Description must be at least 200 characters']
    },
    instructor_rating: {
        type: Number,
        // required: [true, 'Instructor rating is required'],
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot exceed 5'],
        default: 3
    },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);