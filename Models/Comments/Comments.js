const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  post_id: {
    type: mongoose.Schema.ObjectId,
    ref: "posts",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  comment_date: {
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

const Comments = mongoose.model("Comments", comment);

module.exports = Comments;
