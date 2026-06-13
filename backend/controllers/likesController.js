import Like from "../models/likes.js";
import Post from "../models/postModel.js";

export const likePost = async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);

  const newLike = await Like.create({
    user: req.user._id,
    post,
  });
};

export const unlikePost = async (req, res) => {
  const { likeId, postId } = req.body;

  const post = await Post.findById(postId);

  const like = await Like.findById({
    user: req.user._id,
    post,
  });

  await like.deleteOne();

  res.json({ msg: "Post unliked" });
};

export const getLikes = async (req, res) => {
  const { postId } = req.body;

  const likes = await Like.find({
    post: postId,
  });
};
