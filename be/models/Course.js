const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category ID is required']
    },
    course_name: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true,
        minlength: [3, 'Course name must be at least 3 characters'],
        maxlength: [150, 'Course name cannot exceed 50 characters']
    },
    course_description: {
        type: String,
        required: [true, 'Course description is required'],
        trim: true,
        minlength: [20, 'Description must be at least 20 characters']
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
        default: 0
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
        default: 0
    },
    instructor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Instructor ID is required']
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
    instructor_rating: {
        type: Number,
        // required: [true, 'Instructor rating is required'],
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot exceed 5'],
        default: 3
    },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);