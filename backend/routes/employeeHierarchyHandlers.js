// employeeHierarchyHandlers.js

const EmployeeHierarchy = require('../models/employeeHierarchy');

// Handler to add manager and subordinates
const addManagerHandler = async (req, res) => {
  try {
    const { managerId, subordinateIds } = req.body;
    
    // Create a new employee hierarchy document
    const hierarchy = new EmployeeHierarchy({
      manager: managerId,
      subordinates: subordinateIds
    });
    
    // Save the hierarchy document
    await hierarchy.save();
    
    res.status(201).json(hierarchy);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Handler to get all managers and their subordinates
const getAllManagersHandler = async (req, res) => {
  try {
    const hierarchies = await EmployeeHierarchy.find().populate('manager subordinates');
    res.json(hierarchies);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addManagerHandler, getAllManagersHandler };
