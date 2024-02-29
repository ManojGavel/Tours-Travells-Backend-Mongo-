const Comment = require("./../Models/Comments/Comments");

exports.createComment = async (req, res) => {
  try {
    // const comment = new Comment({
    //   user_id: req.body.user_id,
    //   post_id: req.body.post_id,
    //   comment: req.body.comment,
    // });

    // await comment.save();
    console.log(req.body,"req.body");
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

exports.getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        comment.comment = req.body.comment;
        await comment.save();
        res.status(200).json(comment);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        await comment.remove();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

