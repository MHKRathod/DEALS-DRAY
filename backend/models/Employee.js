const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    courses: [{ type: String }],
    img: { type: String }, // Assuming the image URL is stored as a string
    createDate: { type: Date, default: Date.now } // Automatically set to the current date and time when a new document is created
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
