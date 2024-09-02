const express = require("express");
const route = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');

//GET /ADMIN/LOGIN
route.get("/login", async(req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "Welcome to the admin Page"
        }
        res.render('admin/login', {locals})
    } catch (error) {
        console.log(error)
    }
})

//POST ADMIN/LOGIN
route.post('/login', async(req, res) => {
    try {
        const {username, password} = req.body;
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error Loging in"})
    }
})


//POST ADMIN/REGISTER
route.post('/register', async(req, res) => {
    try {
        const {username, password} = req.body;
        if(password.trim() === "" || username.trim() === "") {
          return  res.json({success: false, message: "Fill in all the forms"});
        }

        //validate password
        if(!validator.isStrongPassword(password)) {
           return res.json({success: false, message: "The password is weak"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await userModel.create({
            username: username,
            password: hashedPassword,
        })
        res.json({success: true, data})
        
    } catch (error) {
        if(error.code === 11000) {
          return  res.json({success: false, message: "User already exists"})
        }
        else {
          return  res.json({success: false, message: "Server Error"});
        }
    }
})


module.exports = route