const express = require('express');
const router = express.Router();
const {
    createLike_dislike_comment,
    getAllLike_dislike_comments,
    getLike_dislike_comment,
    updateLike_dislike_comment
} = require('./../Controllers/Like_dislike_comment_controller');

router.route('/').get(getAllLike_dislike_comments).post(createLike_dislike_comment);
router.route('/:id').get(getLike_dislike_comment).patch(updateLike_dislike_comment);





module.exports = router;