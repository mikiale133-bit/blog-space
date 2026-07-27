import express from "express";

const chapterRoutes = express.Router();

import { protect } from "../middleware/authMiddleware.js";
import { createChapter, deleteChapter, getChapter, getSubjectChapters, updateChapter } from "../controllers/Chapter.js";
import { createTopic } from "../controllers/Topics.js";

chapterRoutes.post("/", protect, createChapter);
chapterRoutes.get("/", protect, getSubjectChapters);
chapterRoutes.get("/:chapterId", protect, getChapter);
chapterRoutes.put("/:chapterId", protect, updateChapter);
chapterRoutes.delete("/:chapterId", protect, deleteChapter);

chapterRoutes.post("/:chapterId/topics", protect, createTopic);

export default chapterRoutes;
