import express from "express";

const likesRouter = express.Router();

import { likePost, unlikePost, getPostLikes } from "../controllers/likesController.js";
import { protect } from "../middleware/authMiddleware.js";

likesRouter.post("/", protect, likePost);
likesRouter.get("/:postId", protect, getPostLikes);
likesRouter.delete("/:postId", protect, unlikePost);

export default likesRouter;
