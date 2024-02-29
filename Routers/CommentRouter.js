const commentController = require("./../Controllers/CommentController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(commentController.getComments)
  .post(commentController.createComment);
router
  .route("/:id")
  .get(commentController.getComment)
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
