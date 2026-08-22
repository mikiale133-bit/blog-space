import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  createClass,
  createGroup,
  getGroups,
  getClass,
  getClasses,
  removeStudentFromGroup,
  deleteGroup,
  addStudentsToGroup,
  createQuiz,
  getQuizzes,
  getQuiz,
  getTeacherClasses,
} from "../controllers/class.js";
import { createAssessment, deleteAssessment, getAssessment, getSubjectAssessments, updateAssessment } from "../controllers/assessment.js";

import { createSubject, deleteSubject, getAllSubjects, getClassSubjects, getSubjectById, updateSubject } from "../controllers/Subject.js";

const classRoutes = express.Router();

// HINT! verify teacher admin or staff
classRoutes.post("/", protect, createClass);
classRoutes.get("/", getClasses);
classRoutes.get("/teacher-classes", protect, getTeacherClasses);
classRoutes.get("/:classId", getClass);

// Groups
classRoutes.post("/:classId/groups/:subjectId", protect, createGroup);
classRoutes.get("/:classId/groups/:subjectId", protect, getGroups);
// classRoutes.get("/:classId/groups/:groupId", protect, getGroups);
// classRoutes.put("/:classId/groups/:groupId", protect, getGroups);
classRoutes.delete("/:classId/groups/:groupId/delete", protect, deleteGroup);

classRoutes.post("/:classId/groups/:groupId/add-student", protect, addStudentsToGroup);
classRoutes.delete("/:classId/groups/:groupId/remove-student", protect, removeStudentFromGroup);

// Quizzes
classRoutes.post("/:classId/quizzes", protect, createQuiz);
classRoutes.get("/class/quizzes/:quizId", protect, getQuiz);
classRoutes.get("/:classId/quizzes/:subjectId", protect, getQuizzes);
// classRoutes.put("/:classId/quizzes/:quizId", protect, updateQuiz);
// classRoutes.delete("/:classId/quizzes/:quizId", protect, deleteQuiz);

// Assessment
classRoutes.get("/class/assessments/:assessmentId", protect, getAssessment);
classRoutes.post("/:classId/assessments", protect, createAssessment);
classRoutes.get("/:classId/assessments/:subjectId", protect, getSubjectAssessments);
classRoutes.put("/:classId/assessments/:assessmentId", protect, updateAssessment);
classRoutes.delete("/:classId/assessments/:assessmentId", protect, deleteAssessment);

// SUBJECTS
classRoutes.post("/:classId/subjects", protect, createSubject);
classRoutes.get("/subjects/get", protect, getAllSubjects);
classRoutes.get("/:classId/subjects", getClassSubjects);
classRoutes.get("/class/subjects/:subjectId", getSubjectById);
classRoutes.put("/:classId/subjects/:subjectId", protect, updateSubject);
classRoutes.delete("/:classId/subjects/:subjectId", protect, deleteSubject);

export default classRoutes;
