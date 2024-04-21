const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const {organizationalStructureHandler} = require('../controllers/organizationalController');

router.get('/organizational', organizationalStructureHandler);

router.get('/subordinates/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    
    try {
        // Find the employee by ID in the database
        const employee = await Employee.findById(employeeId).exec();
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        
        // Find the subordinates of the employee
        const subordinates = await Employee.find({ manager: employeeId }).exec();
        res.json(subordinates);
    } catch (error) {
        console.error('Error fetching subordinates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

