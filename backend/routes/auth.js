const express = require('express');

const router = express.Router();

const { signUpHandler, loginHandler } = require('../controllers/authController');
// const User = require("../models/User");

router.route("/register")
     .post(signUpHandler);


     router.route("/login")
          .post(loginHandler);
     module.exports = router;