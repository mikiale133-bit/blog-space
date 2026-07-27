import Post from "../models/postModel.js";
import User from "../models/userModel.js";

import { upload } from "../config/cloudinary.js";
import Follow from "../models/followModel.js";
// import { cloudinary } from "../config/cloudinary.js";

/* ✓ */
export const getPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments();

    const posts = await Post.find().populate("user", "name email profile_img").sort({ createdAt: -1 }).skip(skip).limit(limit);

    res.status(200).json({
      posts,
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ✓ */
export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", " name email profile_img");
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ✓ */
export const getUserPosts = async (req, res) => {
  // const posts = await Post.find({ user: req.user }); //.populate("user", "name email");
  const posts = await Post.find({ user: String(req.params.id) })
    .sort({
      createdAt: -1,
    })
    .populate("user", "name email profile_img");

  if (posts.length === 0) {
    return res.status(404).json({ msg: "No posts found for this user" });
  }

  res.status(200).json({
    count: posts.length,
    posts,
  });
};

/* ✓ */
export const createPost = [
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

      const { title, content, category } = req.body;
      if (!title || !content || !req.file) {
        return res.status(400).json({ msg: "Please provide title, content, and image" });
      }

      //  FALLBACK
      const publicId = req.file.filename || req.file.public_id;
      const imageUrl = req.file.path || req.file.secure_url || req.file.url;

      if (!publicId || !imageUrl) {
        return res.status(400).json({
          message: "Cloudinary upload failed to populate file properties correctly.",
          debug_received: { filename: req.file.filename, path: req.file.path },
        });
      }

      const newPost = await Post.create({
        title,
        content,
        category,
        image: {
          public_id: publicId,
          url: imageUrl,
        },
        user: req.user._id,
      });

      const populatedPost = await newPost.populate("user", "name email profile_img");

      res.status(201).json(populatedPost);
    } catch (error) {
      console.error("CREATE POST ERROR:", error);
      res.status(500).json({ msg: error.message });
    }
  },
];

/* x */
export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  if (!req.user) {
    return res.json("User Not Found");
  }

  // Match post user to logged-in user
  if (post.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User Not authorized");
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

/* ✓ */
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  // Check for user (from protect middleware)
  if (!req.user) {
    return res.status(404).json({ msg: "User Not Found" });
  }

  if (post.user.toString() !== req.user.id) {
    return res.status(400).json({ msg: "You are Not authorized to delete this post" });
  }

  await Post.findByIdAndDelete(req.params.id); // or post.deleteOne()
  res.status(200).json({ id: req.params.id, msg: "Post removed" });
};

// recent posts
export const getRecentPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(4).populate("user", "name email profile_img");

    if (posts.length === 0) {
      res.status(404).json({ msg: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    let posts = [];

    const follows = await Follow.find({
      follower: userId,
    });

    const followingIds = follows.map((follow) => follow.following);

    if (followingIds.length === 0) {
      return res.status(200).json({
        posts: [],
        message: "You're not following anyone yet",
      });
    }

    posts = await Post.find({
      user: { $in: followingIds },
    })
      .populate("user", "username avatar name")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching posts",
    });
  }
};

// Post.find().populate("user", "name email")
//   .then((posts) => res.json(posts))
//   .catch((err) => res.status(500).json({ message: err.message }));
