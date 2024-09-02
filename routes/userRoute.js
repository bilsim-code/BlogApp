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


module.exports = route