import express from "express";
import {
  createSubject,
  deleteSubject,
  getAllSubjects,
  getClassSubjects,
  getSubjectById,
  getSubjectChapters,
  updateSubject,
} from "../controllers/Subject.js";
import { protect } from "../middleware/authMiddleware.js";

const subjectRoutes = express.Router();

subjectRoutes.post("/", protect, createSubject);
subjectRoutes.get("/", protect, getAllSubjects);
subjectRoutes.get("/class-subjects", getClassSubjects);
subjectRoutes.get("/:subjectId/chapters", getSubjectChapters);
subjectRoutes.get("/:subjectId", getSubjectById);
subjectRoutes.put("/:subjectId", protect, updateSubject);
subjectRoutes.delete("/:subjectId", protect, deleteSubject);

subjectRoutes.get("/:subjectId/chapters/:chapterId/topics", getSubjectChapters);

export default subjectRoutes;
