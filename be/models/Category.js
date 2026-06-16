const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        enum: ['Business', 'Finance & Accounting', 'IT & Software', 'Personal Development',
            'Office Productivity', 'Marketing', 'Photography & Video', 'Lifestyle',
            'Design', 'Health & Fitness', 'Music']
    },
    course_count: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);