const express = require("express");
const jwt = require("jsonwebtoken");

const verifyUser = (req,res,next) => {
     const token = req.header.authorisation;
     if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN, (err,user) => {
            if(err){
                res.status(403).json({message:"invalid token"})
            }
            else {
                req.user = user;
                next();
            }
        })  
     }
}

module.exports = verifyUser;