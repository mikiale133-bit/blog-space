import express from "express";
const postsRouter = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getPosts,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.js";

// parent route: /api/posts
postsRouter.get("/", getPosts);
postsRouter.get("/:userId", getUserPosts);
postsRouter.post("/", protect, createPost);
postsRouter.put("/:id", protect, updatePost);
postsRouter.delete("/:id", protect, deletePost);

/*
  After: Clean and expressive
  postsRouter.put("/:id", protect, authorizeOwner(Post), updatePost);
  postsRouter.delete("/:id", protect, authorizeOwner(Post), deletePost);


  export const deletePost = async (req, res) => {
    // We don't need to find the post here; it's already on req.resource!
    await req.resource.deleteOne();
    
    res.status(200).json({ id: req.params.id, msg: "Post removed" });
  };
*/

/*
app.get("/api/users/:userId/posts", getYourPosts);// not protected
*/

export default postsRouter;
