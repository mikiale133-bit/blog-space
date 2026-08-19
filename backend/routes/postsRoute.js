import express from "express";
const postsRouter = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getPosts,
  getSinglePost,
  getUserPosts,
  updatePost,
  deletePost,

  // added features
  getRecentPosts,
  createPost,
  getFollowingPosts,
} from "../controllers/postsController.js";
import { checkLikeStatus } from "../controllers/likesController.js";

// parent route: /api/posts
postsRouter.get("/", getPosts);
postsRouter.get("/recents", getRecentPosts);
postsRouter.get("/following-posts", protect, getFollowingPosts);
postsRouter.post("/check-like-status", protect, checkLikeStatus);
postsRouter.get("/:id", getSinglePost);
postsRouter.get("/users/:id", getUserPosts);
postsRouter.post("/", protect, createPost);
postsRouter.put("/:id", protect, updatePost);
postsRouter.delete("/:id", protect, deletePost);

// added features

/*
app.get("/api/users/:userId/posts", getYourPosts);// not protected
*/

export default postsRouter;
