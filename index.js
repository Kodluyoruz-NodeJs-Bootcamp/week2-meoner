const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const session = require('express-session');


//Import Routes
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/home");


dotenv.config();

//Connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Database Connection Error ", error);
  });

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: false,
  })
);

//Routes
app.use("/api/user", authRoute);
app.use("/api/home", homeRoute);

//Start Server
app.listen(3000, () => console.log("Starting Server..."));
