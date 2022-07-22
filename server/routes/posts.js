const express = require('express');
const {
    createPost, getPosts, getPost, deletePost, updatePost,
} = require('../controllers/postController');

const router = express.Router();

router.get('/', getPosts);

router.post('/', createPost);

router.get('/:id', getPost);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);

module.exports = router;