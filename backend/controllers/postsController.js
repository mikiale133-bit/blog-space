import Post from "../models/postModel.js";
import User from "../models/userModel.js";

/* ✓ */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* x */
export const getUserPosts = async (req, res) => {
  // const posts = await Post.find({ user: req.user }); //.populate("user", "name email");
  const posts = await Post.find({ user: req.params.userId })
    .sort({
      createdAt: -1,
    })
    .populate("user", "name email");

  if (!posts || posts.length === 0) {
    return res.status(404).json({ msg: "No posts found for this user" });
  }

  res.status(200).json({
    count: posts.length,
    posts,
  });
};

/* ✓ */
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: "Please add all fields" });
    }
    const post = await Post.create({
      title,
      content,
      user: req.user._id,
      username: req.user.name,
      email: req.user.email,
    });

    const populatedPost = await post.populate("user", "name email");

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

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
  // Use 'post' (the instance), not 'Post' (the model)
  if (post.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User Not authorized");
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

/* x */
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  // 1. Check if post exists FIRST
  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  // 2. Check for user (from protect middleware)
  if (!req.user) {
    return res.status(404).json({ msg: "User Not Found" });
  }

  // check if the loggein user is the post's user
  if (post.user.toString() !== req.user.id) {
    return res.status(400).json({ msg: "User Not authorized" });
  }

  await Post.findByIdAndDelete(req.params.id); // or post.deleteOne()
  res.status(200).json({ id: req.params.id, msg: "Post removed" });
};

// Post.find().populate("user", "name email")
//   .then((posts) => res.json(posts))
//   .catch((err) => res.status(500).json({ message: err.message }));
