const Post = require("../Models/Posts/Post");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      user_id: req.body.user_id,
      post: req.body.post,
    });
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
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
```

