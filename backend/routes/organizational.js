const express = require('express');
const router = express.Router();

const {organizationalStructureHandler,getSubordinateHandler} = require('../controllers/organizationalController');



router.get('/organizational', organizationalStructureHandler);

router.get('/subordinates/:employeeId', getSubordinateHandler);

module.exports = router;

