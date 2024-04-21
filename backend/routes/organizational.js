const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

const {organizationalStructureHandler,getSubordinateHandler, getEmployeeAndManagerHandler} = require('../controllers/organizationalController');

router.get('/organizational', organizationalStructureHandler);

router.get('/subordinates/:employeeId', getSubordinateHandler);

router.get('/employeesandmanager/:employeeId',getEmployeeAndManagerHandler);


router.get('/employees/subordinates/:managerId', async (req, res) => {
    const { managerId } = req.params;
    try {
        // Find the manager
        const manager = await Employee.findById(managerId).exec();
        
        if (!manager) {
            return res.status(404).json({ error: "Manager not found" });
        }

        // Function to recursively fetch subordinates
        const getSubordinates = async (employeeId) => {
            const subordinates = await Employee.find({ manager: employeeId }).exec();
            let allSubordinates = [];
            for (const subordinate of subordinates) {
                allSubordinates.push(subordinate);
                const indirectSubordinates = await getSubordinates(subordinate._id);
                allSubordinates = allSubordinates.concat(indirectSubordinates);
            }
            return allSubordinates;
        };

        // Get all direct and indirect subordinates of the manager
        const allSubordinates = await getSubordinates(managerId);
        
        res.json(allSubordinates);
    } catch (error) {
        console.error('Error fetching subordinates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

