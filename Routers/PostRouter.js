const exress = require('express');

const router = express.Router();
const PostController = require('../Controllers/PostController');
const authController = require('../Controllers/AuthController');

router.route('/').post(PostController.createPost).get(PostController.getAllPosts);
router.route('/:id').get(PostController.getPostById).patch(PostController.updatePost).delete(PostController.deletePost);



