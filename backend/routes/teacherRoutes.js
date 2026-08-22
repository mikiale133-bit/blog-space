import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { getTeacher, createTeacher, getTeachers, getTeacherSubject } from "../controllers/teacherController.js";

const teachersRouter = express.Router();

teachersRouter.post("/", protect, createTeacher); //verify teacher or staff
teachersRouter.get("/", getTeachers); //verify teacher or staff
teachersRouter.get("/get-me", protect, getTeacher); //verify teacher or staff
teachersRouter.get("/:teacherId/subject", protect, getTeacherSubject); //verify teacher or staff

export default teachersRouter;
