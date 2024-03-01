const commentController = require("./../Controllers/CommentController");
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
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
