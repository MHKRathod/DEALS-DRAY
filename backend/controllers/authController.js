const express = require('express');
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const User = require("../models/User");


const signUpHandler = async (req,res) => {
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
  }

  const loginHandler = async (req,res) => {
        try {
            const user = await User.findOne({ username: req.body.username });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

           
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
            
            if (decryptedPassword !== req.body.password) {
                return res.status(401).json({ message: "Incorrect password" });
            }

            const { password, ...rest } = user._doc;

            const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN);

            res.json({ ...rest, accessToken });
        } catch(err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    module.exports= {signUpHandler,loginHandler}