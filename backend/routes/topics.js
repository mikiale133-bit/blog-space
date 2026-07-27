import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { createTopic, deleteTopic, getChapterTopics, getTopic, updateTopic } from "../controllers/Topics.js";

const topicsRouter = express.Router();

topicsRouter.post("/", protect, createTopic);
topicsRouter.get("/:chapterId", getChapterTopics);

topicsRouter.get("/:topicId", getTopic);
topicsRouter.put("/:topicId", protect, updateTopic);
topicsRouter.delete("/:topicId", protect, deleteTopic);

export default topicsRouter;
