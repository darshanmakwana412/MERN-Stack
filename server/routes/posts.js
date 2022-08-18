const express = require('express');
const {
    createPost, getPosts, getPost, deletePost, updatePost,
} = require('../controllers/postController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)

router.get('/', getPosts);

router.post('/', createPost);

router.get('/:id', getPost);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);

module.exports = router;