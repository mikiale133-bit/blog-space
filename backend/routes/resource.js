import express from "express";

const resourceRouter = express.Router();

import { protect } from "../middleware/authMiddleware.js";

import { createTopicResource, deleteTopicresource, getTopicResource, updateTopicResource } from "../controllers/resource.js";

resourceRouter.post("/", protect, createTopicResource);
resourceRouter.get("/:topicId", protect, getTopicResource);
resourceRouter.put("/:topicId", protect, updateTopicResource);
resourceRouter.delete("/:topicId", protect, deleteTopicresource);

export default resourceRouter;
