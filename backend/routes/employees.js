const express = require('express');
const router = express.Router();

const {employeeUpdateHandler, employeeCreateHandler, employeeGetHandler, employeeDeleteHandler, employeeListHandler} = require('../controllers/employeeController');


router.post('/employees', employeeCreateHandler);

router.put('/employees/edit/:id',employeeUpdateHandler);

router.get('/employees/:id', employeeGetHandler);

router.get('/employees',employeeListHandler);

router.delete('/employees/delete/:id', employeeDeleteHandler);

module.exports = router;
