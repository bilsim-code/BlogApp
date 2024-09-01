const express = require("express");
const router = express.Router();
const postModel = require("../schema/postSchema");

//GET /HOME
router.get("/", async (req, res) => {
  const locals = {
    title: "Nodejs Blog",
    description: "Simple Blog created with Nodejs, Express & MongoDB",
  };
  try {
    const data = await postModel.find();
    res.render("main/index", { locals, data });
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
});

module.exports = router;

/* 

function insertDocuments() {
  postModel.insertMany([
    {
      title: "Building a blog",
      body: "This is the body text",
    },
    {
      title: "Nodejs limiting Network Traffic",
      body: "Learn how to limit network traffic in Node.js",
    },
    {
      title: "Learn Morgan - HTTP Request logger for Node.js",
      body: "Learn Morgan",
    },
    {
      title: "Build real-time, event-driven applications in Node.js",
      body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js",
    },
    {
      title: "Building a Blog",
      body: "This is the body text",
    },
    {
      title: "Discover how to use Express.js",
      body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications",
    },
    {
      title: "Asynchronous programming with Node.js",
      body: "Learn the basics of Node.js and its architecture, how it works and why it is popular among developers.",
    },
    {
      title: "Nodejs limiting Network Traffic",
      body: "Learn how to limit network traffic in Node.js"
    },
    {
      title: "Learn Morgan - HTTP Request logger for Node.js",
      body: "Learn Morgan"
    },
    {
      title: "Build real-time, event-driven applications in Node.js",
      body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js"
    },
    {
      title: "Building a Blog",
      body: "This is the body text"
    },
    {
      title: "Discover how to use Express.js",
      body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications"
    },
    {
      title: "Asynchronous programming with Node.js",
      body: "Learn the basics of Node.js and its architecture, how it works and why it is popular among developers."
    }
  ]);
}

//insertDocuments(); */
