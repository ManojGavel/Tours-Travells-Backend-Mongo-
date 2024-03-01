const Post = require("../Models/Posts/Post");
const express = require("express");
const app = express();

// app.use(express.urlencoded({ extended: true }));
//multer
const multer = require("multer");
//multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../uploads/postImages`);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `post-${req.body.user_id}-${Date.now()}.${ext}`); // soon going to add the
  },
});
//multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

exports.uploadImage = multer({
  storage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});


// Create a new post
exports.createPost = async (req, res) => {
  try {

    if (req.file) {
      req.body.Image = req.file.filename;
    }
    await Post.create(req.body)
    console.log("come to post posts")
    res.status(200).json(Post);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const ImageBaseUrl = "http://localhost:3000/uploads/postImages/"
    const posts = await Post.find().populate("user_id").lean();
    const postsWithImageUrl = posts.map(post => ({
      ...post,
      imageUrl: post.Image ? ImageBaseUrl + post.Image : null
    }));
    res.status(200).json(postsWithImageUrl);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get a post by id
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user_id === req.body.user_id) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been Updated");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await post.findById(req.params.id);
    if (post.user_id === req.body.user_id) {
      await post.deleteOne();
    }
    res.status(200).json("The post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.user_id)) {
      await post.updateOne({ $push: { likes: req.body.user_id } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.user_id } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Comment a post
exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $push: { comments: req.body } });
    res.status(200).json("The post has been commented");
  } catch (err) {
    res.status(500).json(err);
  }
};

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});