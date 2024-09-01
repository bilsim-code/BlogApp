const express = require("express");
const route = express.Router();

//GET /ADMIN
route.get("/", async(req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "Welcome to the admin Page"
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = route