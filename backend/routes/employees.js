// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Create employee
router.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Logging removed to reduce overhead
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true }).lean();
        // Using lean() to improve query performance by returning plain JavaScript objects instead of Mongoose documents
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(updatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//single employee by id
router.get('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get employee list
router.get('/employees', async (req, res) => {
  console.log('Get all employees');
  console.log('hari hari hari')
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
