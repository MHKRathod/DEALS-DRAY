const express = require('express');
const Employee = require('../models/Employee');

const employeeCreateHandler = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const employeeUpdateHandler = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Received PUT request to update employee with ID:', id);
        
        console.log('Request payload:', req.body);
    
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true }).lean();
    
        if (!updatedEmployee) {
            console.log('Employee not found with ID:', id);
            return res.status(404).json({ message: 'Employee not found' });
        }
        console.log('Updated employee:', updatedEmployee);
        return res.json(updatedEmployee);

    } catch (error) {
        console.error('Error updating employee:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const employeeGetHandler = async (req, res) => {
  try {
      const { id } = req.params;
      const employee = await Employee.findById(id);
      if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
      }

      // Fetch direct manager's details
      let manager = null;
      if (employee.manager) {
          manager = await Employee.findById(employee.manager);
      }

      // Include manager's details in the response
      const response = {
          employee: employee,
          manager: manager
      };

      res.json(response);
  } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
  }
};

const employeeListHandler = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const employeeDeleteHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(deletedEmployee);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    employeeCreateHandler,
    employeeUpdateHandler,
    employeeGetHandler,
    employeeListHandler,
    employeeDeleteHandler
};
