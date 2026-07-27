import express from "express";
import { followUser, unfollowUser, getFollowers, getFollowings, checkFollowStatus } from "../controllers/followsController.js";
import { protect } from "../middleware/authMiddleware.js";

const followsRouter = express.Router();

followsRouter.post("/", protect, followUser);
followsRouter.delete("/:userId/unfollow", protect, unfollowUser);
followsRouter.get("/:userId/followers", protect, getFollowers);
followsRouter.get("/:userId/following", protect, getFollowings);
followsRouter.get("/check/:userId", protect, checkFollowStatus);

export default followsRouter;
