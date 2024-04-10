const express = require('express');

const dotenv = require('dotenv');
dotenv.config();


const app = require("./app.js")
const connectDB = require( "./db/index.js")

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});



