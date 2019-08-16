const express = require('express');
const router = express.Router();
//import schema
const Post = require('../models/Post');

//Get back all the posts
router.get('/', async (req, res) => {
    try{ //await the response
        const posts = await Post.find(); //will return all posts 
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});

//Submit a post
router.post('/', (req, res) => {
    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    //save into database (returns a promise)
    post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err});
    });
});

//Get specific post
router.get('/:postId', async (req, res) => {
    /*will look for anything u add after /posts/... on the link
    console.log(req.params.postId);*/
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
});

//Delete post
router.delete('/:postId', async (req, res) => {
    try{
        //Id needs to match with the one requested (with params)
        const removedPost = await Post.remove({_id: req.params.postId});
        //Returns removed post
        res.json(removedPost);
    }catch(err){
        res.json({message: err});
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try{
        //UpdatedOne(); has 2 parameters, the second one is for the new info
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } });

        res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;