const express = require("express");
const route = express.Router();
const userModel = require('../models/userModel');

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
        if(username === 'admin' && password === 'admin') {
            console.log(req.body)
            res.redirect('/')
        }
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error Loging in"})
    }
})


//POST ADMIN/REGISTER
route.post('/register', async(req, res) => {
    try {
        const {username, password} = req.body;
        if(password === "" && username === "") {
            res.json({success: false, message: "Fill in all the forms"});
        }
        
    } catch (error) {
        
    }
})


module.exports = route