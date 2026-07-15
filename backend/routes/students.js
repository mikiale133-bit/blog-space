import express from "express";
import { getChat, getChats, createChat, deleteChat } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";
import { createStudent, getMystudents, studentGetMe } from "../controllers/students.js";

const studentsRouter = express.Router();

studentsRouter.get("/get-me", protect, studentGetMe);
studentsRouter.post("/", protect, createStudent); //verify teacher
studentsRouter.get("/:classId", protect, getMystudents); //verify teacher

export default studentsRouter;
