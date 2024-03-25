// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const {employeeUpdateHandler, employeeCreateHandler, employeeGetHandler, employeeDeleteHandler, employeeListHandler} = require('../controllers/employeeController');

// Create employee
router.post('/employees', employeeCreateHandler);


// Update the route handler to handle JSON payloads
router.put('/employees/edit/:id',employeeUpdateHandler);

//single employee by id
router.get('/employees/:id', employeeGetHandler);

// Get employee list
router.get('/employees',employeeListHandler);

router.delete('/employees/delete/:id', employeeDeleteHandler);

module.exports = router;
