const express = require("express");
const route = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require('jsonwebtoken')

//GET /ADMIN/LOGIN
route.get("/login", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Welcome to the admin Page",
    };
    res.render("admin/login", { locals });
  } catch (error) {
    console.log(error);
  }
});

//POST ADMIN/REGISTER
route.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (password.trim() === "" || username.trim() === "") {
        return res.json({ success: false, message: "Fill in all the forms" });
      }
  
      //validate password
      if (!validator.isStrongPassword(password)) {
        return res.json({ success: false, message: "The password is weak" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await userModel.create({
        username: username,
        password: hashedPassword,
      });
      res.json({ success: true, data });
    } catch (error) {
      if (error.code === 11000) {
        return res.json({ success: false, message: "User already exists" });
      } else {
          console.log(error)
        return res.json({ success: false, message: "Server Error" });
      }
    }
  });

//POST ADMIN/LOGIN
route.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({username});
    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: "Incorrect Password" });
    }

    //token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res.cookie('token', token, {httpOnly: true});
    res.redirect('/dashboard')

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Loging in" });
  }
});

//GET /dashboard
route.get('/dashboard', async(req, res) => {
    try {

        res.render('admin/dashboard')
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
})





module.exports = route;
