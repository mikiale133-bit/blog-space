import express from "express";

const likesRouter = express.Router();

import { likePost, unlikePost, getLikes } from "../controllers/likesController.js";
import { protect } from "../middleware/authMiddleware.js";

likesRouter.post("/", protect, likePost);
likesRouter.delete("/:id", protect, unlikePost);
likesRouter.get("/", protect, getLikes);

export default likesRouter;
