const mongoose = require("mongoose");

const post = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  post_date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("posts", post);