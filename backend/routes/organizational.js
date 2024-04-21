const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

const {organizationalStructureHandler,getSubordinateHandler} = require('../controllers/organizationalController');

router.get('/organizational', organizationalStructureHandler);

router.get('/subordinates/:employeeId', getSubordinateHandler);

router.get('/employeesandmanager/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    try {
        const employee = await Employee.findById(employeeId)
            .populate('manager') // Populate the manager field with details
            .exec();
        
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

