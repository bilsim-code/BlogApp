const express = require('express');
const app = express();
const PORT = process.env.PORT;
const postRoute = require("./routes/postRoute");
const adminRoute = require('./routes/userRoute');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');


mongoose.connect(process.env.MONGODBURI)
.then(() => {
    console.log(`Database connected: ${mongoose.connection.host}`)
})
.catch(error => console.log(error));
//END OF IMPORTS

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODBURI
    })
}))
app.use(express.urlencoded({extended: true}));
app.use(express.static('public', {root: __dirname}));


//ejs engine
app.set('view engine', 'ejs');
 
app.use("/", postRoute); 
app.use("/", adminRoute);

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