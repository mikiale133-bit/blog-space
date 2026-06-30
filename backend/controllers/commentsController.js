import Comment from "../models/comments.js";
import Post from "../models/postModel.js";

export const createComment = async (req, res) => {
  try {
    const alreadyCommented = await Comment.findOne({
      post: req.body.postId,
      user: req.user._id,
    });

    if (alreadyCommented) {
      return res.status(400).json({ message: "You have already commented on this post." });
    }

    const newComment = await Comment.create({
      post: req.body.postId,
      user: req.user._id,
      content: req.body.content,
      type: req.body.type,
    });

    await Post.findByIdAndUpdate(req.body.postId, { $inc: { num_comments: 1 } });

    await newComment.populate("user", "name email profile_img");

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      error: "Failed to create post",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate("user", "name email profile_img");

    res.status(200).json(comments);
  } catch (error) {
    res.ststus(500).json({
      message: error.message,
      error: "Failed to create post",
    });
  }
};

export const deleteComment = async (req, res) => {
  // const { commentId } = req.body;
  const comment = await Comment.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  await Post.findByIdAndUpdate(req.body.postId, { $inc: { num_comments: -1 } });

  if (!comment) {
    return res.status(404).json({ msg: "Comment not found" });
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  res.status(200).json({ msg: "Comment deleted" });
};

export const updateComment = async (req, res) => {
  // const { commentId } = req.body;
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ msg: "Comment not found" });
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  comment.content = req.body.content || comment.content;
  comment.type = req.body.type || comment.type;

  await comment.save();
  res.status(200).json(comment);
};

export const likeComment = async (req, res) => {};

export const unlikeComment = async (req, res) => {};
