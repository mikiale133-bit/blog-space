import express from "express";

const commentsRouter = express.Router();
import { createComment, deleteComment, getComments } from "../controllers/commentsController.js";
import { protect } from "../middleware/authMiddleware.js";

commentsRouter.post("/", protect, createComment);
commentsRouter.delete("/:id", protect, deleteComment);
commentsRouter.get("/:postId", protect, getComments);

export default commentsRouter;
