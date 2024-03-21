// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Create employee
router.post('/employees', async (req, res) => {
  try {
    console.log("Creating new employee...");
    const employee = new Employee(req.body);
    await employee.save();
    console.log("Employee created successfully:", employee);
    res.status(201).json(employee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(400).json({ message: err.message });
  }
});

// Update employee by ID
router.put('/edit/:id', async (req, res) => {
  try {
    console.log("Updating employee...");
    const { id } = req.params;
    console.log("Employee ID:", id);
    console.log("Request Body:", req.body);
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true }).lean();
    console.log("Updated Employee:", updatedEmployee);
    if (!updatedEmployee) {
      console.log("Employee not found");
      return res.status(404).json({ message: 'Employee not found' });
    }
    console.log("Employee updated successfully");
    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single employee by ID
router.get('/employees/:id', async (req, res) => {
  try {
    console.log("Fetching employee by ID...");
    const { id } = req.params;
    console.log("Employee ID:", id);
    const employee = await Employee.findById(id);
    console.log("Fetched Employee:", employee);
    if (!employee) {
      console.log("Employee not found");
      return res.status(404).json({ message: 'Employee not found' });
    }
    console.log("Employee found");
    res.json(employee);
  } catch (err) {
    console.error("Error fetching employee by ID:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get employee list
router.get('/employees', async (req, res) => {
  try {
    console.log("Fetching all employees...");
    const employees = await Employee.find();
    console.log("Fetched Employees:", employees);
    res.json(employees);
  } catch (err) {
    console.error("Error fetching all employees:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
