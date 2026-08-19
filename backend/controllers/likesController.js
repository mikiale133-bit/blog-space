import Like from "../models/likes.js";
import Post from "../models/postModel.js";

export const likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user already liked the post
    const existingLike = await Like.findOne({
      user: req.user._id,
      post: postId,
    });

    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: "You already liked this post",
      });
    }

    const newLike = await Like.create({
      user: req.user._id,
      post: post._id,
    });

    await Post.findByIdAndUpdate(postId, { $inc: { num_likes: 1 } });

    res.status(200).json({
      success: true,
      message: "Post liked successfully",
      like: newLike,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }

    const like = await Like.findOneAndDelete({
      user: req.user._id,
      post: postId,
    });

    if (!like) {
      return res.status(404).json({
        success: false,
        message: "Like not found",
      });
    }

    await Post.findByIdAndUpdate(postId, { $inc: { num_likes: -1 } });

    res.status(200).json({
      success: true,
      message: "Post unliked successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const likes = await Like.find({
      post: postId,
    }).populate("user", "name email profile_img");

    res.status(200).json({
      success: true,
      count: likes.length,
      likes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkLikeStatus = async (req, res) => {
  try {
    const { postId } = req.body;

    console.log("PostId: ", postId);

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const like = await Like.findOne({
      user: req.user._id,
      post: postId,
    });

    const isLiked = !!like; // Convert to boolean

    res.status(200).json({
      success: true,
      isLiked,
    });
  } catch (error) {
    console.log("Error checking like status: ", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
