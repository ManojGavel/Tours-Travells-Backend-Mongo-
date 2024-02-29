const React = require("./../Models/Likes_dislike_comments/likes_dislike_comments");

exports.createLike_dislike_comment = async (req, res) => {
    try {
        const newLike_dislike_comment = await React.create(req.body);
        res.status(201).json({
        status: "success",
        data: {
            newLike_dislike_comment,
        },
        });
    } catch (err) {
        res.status(400).json({
        status: "fail",
        message: err,
        });
    }
    };

exports.getAllLike_dislike_comments = async (req, res) => {
    try {
        const like_dislike_comments = await React.find();
        res.status(200).json({
        status: "Success",
        results: like_dislike_comments.length,
        data: {
            like_dislike_comments,
        },
        });
    } catch (err) {
        res.status(404).json({
        status: "fail",
        message: err,
        });
    }
    };

exports.getLike_dislike_comment = async (req, res) => {
    try {
        const like_dislike_comment = await React.findById(req.params.id);
        res.status(200).json({
        status: "success",
        data: {
            like_dislike_comment,
        },
        });
    } catch (err) {
        res.status(404).json({
        status: "fail",
        message: err,
        });
    }
    }

exports.updateLike_dislike_comment = async (req, res) => {
    try {
        const like_dislike_comment = await React.findById(req.params.id);
        await like_dislike_comment.updateOne({ $set: req.body });
        res.status(200).json("The like_dislike_comment has been Updated");
    }
    catch (err) {
        res.status(500).json(err);
    }
    };

exports.deleteLike_dislike_comment = async (req, res) => {
    try {
        const like_dislike_comment = await React.findById(req.params.id);
        await like_dislike_comment.deleteOne();
        res.status(200).json("The like_dislike_comment has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Like a comment
exports.likeComment = async (req, res) => {
    try {
        const comment = await React.findById(req.params.id);
        if (!comment.likes.includes(req.body.user_id)) {
        await comment.updateOne({ $push: { likes: req.body.user_id } });
        res.status(200).json("The comment has been liked");
        } else {
        await comment.updateOne({ $pull: { likes: req.body.user_id } });
        res.status(200).json("The comment has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Dislike a comment
exports.dislikeComment = async (req, res) => {
    try {
        const comment = await React.findById(req.params.id);
        if (!comment.dislikes.includes(req.body.user_id)) {
        await comment.updateOne({ $push: { dislikes: req.body.user_id } });
        res.status(200).json("The comment has been disliked");
        } else {
        await comment.updateOne({ $pull: { dislikes: req.body.user_id } });
        res.status(200).json("The comment has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all likes of a comment
exports.getAllLikes = async (req, res) => {
    try {
        const comment = await React.findById(req.params.id);
        res.status(200).json(comment.likes);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all dislikes of a comment
exports.getAllDislikes = async (req, res) => {
    try {
        const comment = await React.findById(req.params.id);
        res.status(200).json(comment.dislikes);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all likes and dislikes of a comment
exports.getAllLikesAndDislikes = async (req, res) => {
    try {
        const comment = await React.findById(req.params.id);
        res.status(200).json({
        likes: comment.likes,
        dislikes: comment.dislikes,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all comments of a post
exports.getAllComments = async (req, res) => {
    try {
        const post = await React.findById(req.params.id);
        res.status(200).json(post.comments);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all comments of a user
exports.getAllCommentsOfUser = async (req, res) => {
    try {
        const user = await React.findById(req.params.id);
        res.status(200).json(user.comments);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all likes of a user
exports.getAllLikesOfUser = async (req, res) => {
    try {
        const user = await React.findById(req.params.id);
        res.status(200).json(user.likes);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all dislikes of a user
exports.getAllDislikesOfUser = async (req, res) => {
    try {
        const user = await React.findById(req.params.id);
        res.status(200).json(user.dislikes);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all likes and dislikes of a user
exports.getAllLikesAndDislikesOfUser = async (req, res) => {
    try {
        const user = await React.findById(req.params.id);
        res.status(200).json({
        likes: user.likes,
        dislikes: user.dislikes,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }

    // Get all likes of a post
exports.getAllLikesOfPost = async (req, res) => {
    try {
        const post = await React.findById(req.params.id);
        res.status(200).json(post.likes);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all dislikes of a post
exports.getAllDislikesOfPost = async (req, res) => {
    try {
        const post = await React.findById(req.params.id);
        res.status(200).json(post.dislikes);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all likes and dislikes of a post
exports.getAllLikesAndDislikesOfPost = async (req, res) => {
    try {
        const post = await React.findById(req.params.id);
        res.status(200).json({
        likes: post.likes,
        dislikes: post.dislikes,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all comments of a user
exports.getAllCommentsOfUser = async (req, res) => {
    try {
        const user = await React.findById(req.params.id);
        res.status(200).json(user.comments);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all likes of a user
exports.getAllLikesOfUser = async (req, res) => {
    try {
        const user = await React.findById(req.params.id);
        res.status(200).json(user.likes);
    } catch (err) {
        res.status(500).json(err);
    }
    }

    // Get all dislikes of a user
exports.getAllDislikesOfUser = async (req, res) => {
    try {
        const user = await React.findById(req.params.id);
        res.status(200).json(user.dislikes);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all likes and dislikes of a user
exports.getAllLikesAndDislikesOfUser = async (req, res) => {
    try {
        const user = await React.findById(req.params.id);
        res.status(200).json({
        likes: user.likes,
        dislikes: user.dislikes,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
    // Get all likes of a post