const express = require('express');

const router = express.Router();

const Post = require('../models/post');


// Making a post request for adding a post 
router.post("", (req, res, next) => {
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
router.get("", (req, res, next) => {
    Post.find().then(
        document => {
            res.status(200).json({
                message: "Posts fetched successfully",
                posts: document
            });
        }
    );
});

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({ message: "Updated sucessfully" });
    });
});

// for getting the post while editing
router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    });
});

// Delete the post
router.delete('/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status('200').json({
            message: "Post deleted successfully"
        });
    });
});

module.exports = router; 