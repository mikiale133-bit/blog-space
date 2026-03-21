import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userControler.js";
const userRouter = express.Router();

userRouter.get("/me", protect, getMe);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
