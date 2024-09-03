const express = require("express");
const route = express.Router();
const userModel = require("../models/userModel");
const postModel = require('../models/postsModel');
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { AuthMechanism } = require("mongodb");

//authMiddleware
const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
     return res.redirect('/')
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

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
      console.log(error);
      return res.json({ success: false, message: "Server Error" });
    }
  }
});

//POST ADMIN/LOGIN
route.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: "Incorrect Password" });
    }

    //token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Loging in" });
  }
});

//GET /dashboard
route.get("/dashboard", authMiddleware, async (req, res) => {
    const locals = {
        title: "Dashboard",
        description: "Simple Blog created with Nodejs, Express & Mongodb",
    }
  try {
    const data = await postModel.find();
    res.render("admin/dashboard", {data, locals});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

//GET /add-post
route.get('/add-post',authMiddleware, async(req, res) => {
    try {
        const locals = {
            title: "Add Post",
            description: "Simple Blog created with Nodejs, Express & Mongodb"
        }
        const data = await postModel.find();
        res.render('admin/add-post', {locals, data})
        
    } catch (error) {
        console.log(error);
    }
})

//POST add-post
route.post('/add-post', authMiddleware, async(req, res) => {
    try {
        const {title, body} = req.body
        if(title.trim() === "" || body.trim() === "") {
           return res.json({success: false, message: "Pleases add data "})
        }
        const data = await postModel.create({
            title,
            body
        })

        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
})

//GET edit-post
route.get('/edit-post/:id', authMiddleware, async(req, res) => {
  try {
    const id = req.params.id;
    const data = await postModel.findById({_id: id});
    res.render('admin/edit-post', {data})
    
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
})

module.exports = route;
