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


module.exports = {
    organizationalStructureHandler,
    getSubordinateCount
};