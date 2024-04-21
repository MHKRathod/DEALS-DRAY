const express = require('express');
const Employee = require('../models/Employee');

const getSubordinateCount = async (employeeId) => {
    let count = 0;
    const employee = await Employee.findById(employeeId).exec();
    if (!employee) {
        return 0;
    }
    const directSubordinates = await Employee.find({ manager: employeeId }).exec();
    count += directSubordinates.length;
    for (const subordinate of directSubordinates) {
        count += await getSubordinateCount(subordinate._id);
    }
    return count;
};

// Organizational structure handler
const organizationalStructureHandler = async (req, res) => {
    try {
        const employees = await Employee.find().lean();
        const structure = {};
        for (const employee of employees) {
            structure[employee._id] = {
                employee: employee,
                subordinates: await getSubordinateCount(employee._id)
            };
        }
        res.json(structure);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getSubordinateHandler = async (req, res) => {
    const { employeeId } = req.params;
    
    try {
        // Find the employee by ID in the database
        const employee = await Employee.findById(employeeId).exec();
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        
        // Find the subordinates of the employee
        const subordinates = await Employee.find({ manager: employeeId }).exec();
        
        // Calculate the subordinate count
        const subordinateCount = await getSubordinateCount(employeeId);
        
        // Construct the response including subordinates and subordinate count
        const responseData = {
            subordinates: subordinates,
            subordinateCount: subordinateCount
        };
        
        res.json(responseData);
    } catch (error) {
        console.error('Error fetching subordinates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    organizationalStructureHandler,
    getSubordinateHandler
};