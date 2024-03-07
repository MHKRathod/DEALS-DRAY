const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'] // Define enum values here
},
  courses: [{ type: String }],
  image: { type: String }
});

module.exports = mongoose.model('Employee', employeeSchema);