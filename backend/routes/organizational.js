const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const {organizationalStructureHandler} = require('../controllers/organizationalController');

router.get('/organizational', organizationalStructureHandler);

module.exports = router;