const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const router = express.Router();
const PostController = require("../Controllers/PostController");

router
  .route("/")
  .post(PostController.uploadImage.single("Image"), PostController.createPost)
  .get(PostController.getAllPosts);
router
  .route("/:id")
  .get(PostController.getPostById)
  .patch(PostController.updatePost)
  .delete(PostController.deletePost);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
module.exports = router;
