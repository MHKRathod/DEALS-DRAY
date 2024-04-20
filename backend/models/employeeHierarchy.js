// employeeHierarchy.js

const mongoose = require('mongoose');

const EmployeeHierarchySchema = new mongoose.Schema({
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  subordinates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }]
});

module.exports = mongoose.model('EmployeeHierarchy', EmployeeHierarchySchema);
