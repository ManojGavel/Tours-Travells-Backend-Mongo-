const express = require("express");
const app = express();
const userRouter = require("./Routers/userRouter");
const postRouter = require("./Routers/PostRouter");
const like_dislike_commentRouter = require("./Routers/Like_dislike_comment_Router");
const commentRouter = require("./Routers/CommentRouter");

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/like_dislike_comments', like_dislike_commentRouter);
app.use('/api/v1/comments', commentRouter);

module.exports = app;