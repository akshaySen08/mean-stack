const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

mongoose.connect('mongodb://localhost:27017/my-social-network', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected successfully to database');
  })
  .catch(() => {
    console.log("Connection failed");
  });
const app = express();



app.use(bodyParser.json()); // for extracting data from post request
app.use(bodyParser.urlencoded({ extended: false }));

// for CORS 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// TO use posts routes...
app.use('/api/posts', postRoutes);

module.exports = app;
