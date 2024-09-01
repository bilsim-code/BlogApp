const express = require('express');
const app = express();
const PORT = process.env.PORT;
const postRoute = require("./routes/postRoute");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODBURI)
.then(() => {
    console.log(`Database connected: ${mongoose.connection.host}`)
})
.catch(error => console.log(error));
//END OF IMPORTS

app.use(express.static('public', {root: __dirname}))

//ejs engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
 
app.use("/", postRoute); 

//GET about
app.get("/about", (req, res) => {
    res.render("main/about")
})

//REDIRECT TO HOME
app.get("/home", (req, res) => {
    res.redirect("/")
})

//Error Page
app.use((req, res) => {
    res.render("main/error");
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})