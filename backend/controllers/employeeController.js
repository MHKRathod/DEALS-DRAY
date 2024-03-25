const express = require('express');
const router = express.Router();
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
          
          // Log the request body to verify the data sent from the frontend
          console.log('Request payload:', req.body);
      
          // Update the employee record in the database
          const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true }).lean();
      
          // Check if the employee record was updated successfully
          if (!updatedEmployee) {
            console.log('Employee not found with ID:', id);
            return res.status(404).json({ message: 'Employee not found' });
          }
      
          // Log the updated employee data
          console.log('Updated employee:', updatedEmployee);
      
          // Send the updated employee data in the response
          return res.json(updatedEmployee);
        } catch (error) {
          // Log any errors that occur during the update process
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
          res.json(employee);
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
        employeeUpdateHandler,employeeGetHandler,employeeListHandler,employeeDeleteHandler};