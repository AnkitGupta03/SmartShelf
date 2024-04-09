const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();


import { app } from "./app.js"
import { connectDB } from "./db/index.js"

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});



