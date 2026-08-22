import express from "express";

const assessmentRoutes = express.Router();

import { protect } from "../middleware/authMiddleware.js";

import { createAssessment, deleteAssessment, getAssessment, getSubjectAssessments, updateAssessment } from "../controllers/assessment.js";

assessmentRoutes.post("/", protect, createAssessment);
assessmentRoutes.get("/subject-assessments", protect, getSubjectAssessments);
assessmentRoutes.get("/:assessmentId", protect, getAssessment);
assessmentRoutes.put("/:assessmentId", protect, updateAssessment);
assessmentRoutes.delete("/:assessmentId", protect, deleteAssessment);

export default assessmentRoutes;
