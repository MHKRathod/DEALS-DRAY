const express = require('express');
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require("../models/User");

router.route("/register")
     .post(async (req,res) => {
        try{
           const newUser = new User({
                username: req.body.username,
                password: CryptoJS.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET_KEY).toString()
           })
           const savedUser = await newUser.save();
             res.status(201).json(savedUser)
        }
        catch(err){
            res.status(500).json({message: "Could not register user"});
        }
     })


     router.route("/login")
          .post(async (req,res) => {
            try {
                // Find the user by username
                const user = await User.findOne({ username: req.body.username });
    
                // Check if user exists
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
    
                // Decrypt stored password
                const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
                
                // Compare decrypted password with provided password
                if (decryptedPassword !== req.body.password) {
                    return res.status(401).json({ message: "Incorrect password" });
                }
    
                // Remove password from user object
                const { password, ...rest } = user._doc;
    
                // Generate access token
                const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN);
    
                // Send response with user data and access token
                res.json({ ...rest, accessToken });
            } catch(err) {
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
            }
        });
     module.exports = router;