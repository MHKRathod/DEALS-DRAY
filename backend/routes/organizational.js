const express = require('express');
const router = express.Router();

const {organizationalStructureHandler,getSubordinateHandler, getEmployeeAndManagerHandler, getManagerHandler} = require('../controllers/organizationalController');

router.get('/organizational', organizationalStructureHandler);

router.get('/subordinates/:employeeId', getSubordinateHandler);

router.get('/employeesandmanager/:employeeId',getEmployeeAndManagerHandler);

router.get('/employees/subordinates/:managerId',getManagerHandler);

module.exports = router;

