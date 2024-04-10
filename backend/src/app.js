const express = require("express");
const app = express();

// middlewares

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// import routes

const userRouter = require( "./routes/user.route.js");

// declare routes

app.use("/api/v1/users", userRouter);
module.exports = app;
