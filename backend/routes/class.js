import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  createClass,
  createGroup,
  getGroups,
  getClass,
  getClasses,
  getMyClasses,
  removeStudentFromGroup,
  deleteGroup,
  addStudentsToGroup,
  createQuiz,
  getQuizzes,
  getQuiz,
  nullgroup,
} from "../controllers/class.js";
import { createAssessment, deleteAssessment, getAssessment, getAssessments, updateAssessment } from "../controllers/assessment.js";

import { addResource, getResources, getResourcesByType } from "../controllers/resource.js";

const classRoutes = express.Router();

// HINT! verify teacher admin or staff
classRoutes.post("/", createClass);
classRoutes.get("/", getClasses);
classRoutes.get("/teacher/my-classes", getMyClasses);
classRoutes.get("/:classId", getClass);

// Groups
classRoutes.post("/:classId/groups", protect, createGroup);
classRoutes.get("/:classId/groups", protect, getGroups);
// classRoutes.get("/:classId/groups/:groupId", protect, getGroups);
// classRoutes.put("/:classId/groups/:groupId", protect, getGroups);
classRoutes.delete("/:classId/groups/:groupId/delete", protect, deleteGroup);

classRoutes.post("/:classId/groups/:groupId/add-student", protect, addStudentsToGroup);
classRoutes.delete("/:classId/groups/:groupId/remove-student", protect, removeStudentFromGroup);

// Quizzes
classRoutes.post("/:classId/quizzes", protect, createQuiz);
classRoutes.get("/:classId/quizzes", protect, getQuizzes);
classRoutes.get("/class/quizzes/:quizId", protect, getQuiz);
// classRoutes.put("/:classId/quizzes/:quizId", protect, updateQuiz);
// classRoutes.delete("/:classId/quizzes/:quizId", protect, deleteQuiz);

// Assessment
classRoutes.post("/:classId/assessments", protect, createAssessment);
classRoutes.get("/:classId/assessments", protect, getAssessments);
classRoutes.get("/class/assessments/:assessmentId", protect, getAssessment);
classRoutes.put("/:classId/assessments/:assessmentId", protect, updateAssessment);
classRoutes.delete("/:classId/assessments/:assessmentId", protect, deleteAssessment);

// Resources
classRoutes.post("/:classId/resources", protect, addResource);
classRoutes.get("/:classId/resources", protect, getResources);
classRoutes.post("/:classId/resources/by-type", getResourcesByType);
// classRoutes.get("/class/assessments/:assessmentId", protect, getAssessment);
// classRoutes.put("/:classId/assessments/:assessmentId", protect, updateAssessment);
// classRoutes.delete("/:classId/assessments/:assessmentId", protect, deleteAssessment);

// classRoutes.post("/null", nullgroup);

export default classRoutes;
