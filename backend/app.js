const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-social-network', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected successfully to database');
  })
  .catch(() => {
    console.log("Connection failed");
  });

const Post = require('./models/post');
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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Making a post request for adding a post 
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

// Allowing all requests to get the available posts
app.get("/api/posts", (req, res, next) => {
  Post.find().then(
    document => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: document
      });
    }
  );
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status('200').json({
      message: "Post deleted successfully"
    });
  });
});

module.exports = app;
