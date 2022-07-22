const Post = require('../models/postModel');
const mongoose = require('mongoose');

const getPosts = async (req, res)=> {
    const posts = await Post.find({}).sort({createdAt: -1});
    res.status(200).json(posts);
}

const createPost = async (req, res)=> {
    const {title, content, author} = req.body;
    try {
        const post = await Post.create({title, content, author});
        res.status(200).json(post);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const getPost = async (req, res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Post"});
    }

    const post = await Post.findById(id);
    if(!post) res.status(404).json({error: "No such Post"});
    else res.status(200).json(post);
}

const deletePost = async (req, res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Post"});
    }

    const post = await Post.findOneAndDelete({_id: id});

    if(!post) res.status(404).json({error: "No such Post"});
    else res.status(200).json(post);
}

const updatePost = async (req, res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Post"});
    }

    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!post) res.status(404).json({error: "No such Post"});
    else res.status(200).json(post);
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    deletePost,
    updatePost
};