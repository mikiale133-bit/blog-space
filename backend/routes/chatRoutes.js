import express from "express";
import { getChat, getChats, createChat, deleteChat } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const chatRoutes = express.Router();

chatRoutes.post("/", protect, createChat);
chatRoutes.get("/", protect, getChats);
chatRoutes.get("/:id", protect, getChat);
chatRoutes.delete("/:id", protect, deleteChat);

export default chatRoutes;
