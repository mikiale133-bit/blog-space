import Like from "../models/likes.js";
import Post from "../models/postModel.js";

export const likePost = async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);

  const newLike = await Like.create({
    user: req.user._id,
    post: post._id,
  });

  await Post.findByIdAndUpdate(postId, { $inc: { num_likes: 1 } });

  res.status(200).json({
    success: true,
    message: "Post liked successfully",
  });
};

export const unlikePost = async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findById(postId);

  const like = await Like.findById({
    user: req.user._id,
    post: post._id,
  });

  await Like.findByIdAndDelete(req.params.likeId);

  res.json({ msg: "Post unliked" });
};

export const getPostLikes = async (req, res) => {
  const { postId } = req.params;

  const likes = await Like.find({
    post: postId,
  }).populate("user", "name email profile_img");

  res.status(200).json({ likes });
};
