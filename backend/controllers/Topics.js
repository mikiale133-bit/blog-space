import mongoose from "mongoose";
import Topic from "../models/curricullum/Topic.js";

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const createTopic = async (req, res) => {
  try {
    const { name, chapterId } = req.body;

    // Validation
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Topic name is required",
      });
    }

    // Check for duplicate topic
    const existingTopic = await Topic.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
      chapterId,
    });

    if (existingTopic) {
      return res.status(409).json({
        success: false,
        message: `Topic "${name}" already exists in this subject`,
      });
    }

    const topic = await Topic.create({
      name: name.trim(),
      chapterId: chapterId || null,
    });

    res.status(201).json({
      success: true,
      message: "Topic created successfully",
      topic,
    });
  } catch (error) {
    console.error("Error creating topic:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating topic. Please try again later",
    });
  }
};

export const getChapterTopics = async (req, res) => {
  try {
    const { chapterId } = req.params;

    if (!chapterId) {
      return res.status(400).json({
        success: false,
        message: "Chapter ID is required",
      });
    }

    const filter = {};

    if (chapterId) {
      if (!isValidObjectId(chapterId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid chapter ID format",
        });
      }
      filter.chapterId = chapterId;
    }

    const topics = await Topic.find(filter).sort({ chapterNo: 1 }).lean();

    res.status(200).json({
      success: true,
      message: "Topics retrieved successfully",
      topics,
    });
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching topics. Please try again later",
    });
  }
};

export const getTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "Topic ID is required",
      });
    }

    if (!isValidObjectId(topicId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid topic ID format",
      });
    }

    const topic = await Topic.findById(topicId).lean();

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: `Topic with ID ${topicId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Topic retrieved successfully",
      topic,
    });
  } catch (error) {
    console.error("Error fetching topic:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching topic. Please try again later",
    });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { name } = req.body;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "Topic ID is required",
      });
    }

    if (!isValidObjectId(topicId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid topic ID format",
      });
    }

    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: `Topic with ID ${topicId} not found`,
      });
    }

    if (name) {
      // Check duplicate name
      const duplicate = await Topic.findOne({
        name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
        subjectId: topic.subjectId,
        _id: { $ne: topicId },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `Topic "${name}" already exists in this subject`,
        });
      }
    }

    const updatedTopic = await Topic.findByIdAndUpdate(topicId, { name: name.trim() }, { new: true, runValidators: true }).lean();

    res.status(200).json({
      success: true,
      message: "Topic updated successfully",
      topic: updatedTopic,
    });
  } catch (error) {
    console.error("Error updating topic:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating topic. Please try again later",
    });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "Topic ID is required",
      });
    }

    if (!isValidObjectId(topicId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid topic ID format",
      });
    }

    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: `Topic with ID ${topicId} not found`,
      });
    }

    await Topic.findByIdAndDelete(topicId);

    res.status(200).json({
      success: true,
      message: `Topic "${topic.name}" deleted successfully`,
      topicId,
    });
  } catch (error) {
    console.error("Error deleting topic:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting topic. Please try again later",
    });
  }
};

/*
import mongoose from "mongoose";
import Topic from "../models/curricullum/Topic";
import Chapter from "../models/curricullum/Chapter";
import Subject from "../models/curricullum/Subject";

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id) && new mongoose.Types.ObjectId(id).toString() === id;
};

// Helper function to check if document exists
const checkExists = async (model, id, modelName) => {
  const doc = await model.findById(id);
  if (!doc) {
    throw new Error(`${modelName} with ID ${id} not found`);
  }
  return doc;
};

export const createTopic = async (req, res) => {
  try {
    const { name, description, chapterId, subjectId, order, resources } = req.body;

    // Validate required fields
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Topic name is required and cannot be empty",
        field: "name",
      });
    }

    if (!chapterId) {
      return res.status(400).json({
        success: false,
        message: "Chapter ID is required to create a topic",
        field: "chapterId",
      });
    }

    // Validate ObjectId format
    if (!isValidObjectId(chapterId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chapter ID format. Please provide a valid ObjectId",
        field: "chapterId",
      });
    }

    if (subjectId && !isValidObjectId(subjectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subject ID format. Please provide a valid ObjectId",
        field: "subjectId",
      });
    }

    // Check if chapter exists
    const chapter = await checkExists(Chapter, chapterId, "Chapter");

    // Check if subject exists (if provided)
    let subject = null;
    if (subjectId) {
      subject = await checkExists(Subject, subjectId, "Subject");
    }

    // Check for duplicate topic name within the same chapter
    const existingTopic = await Topic.findOne({
      chapterId,
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (existingTopic) {
      return res.status(409).json({
        success: false,
        message: `A topic with the name "${name}" already exists in this chapter`,
        field: "name",
      });
    }

    // Create the topic
    const topic = await Topic.create({
      name: name.trim(),
      description: description?.trim() || "",
      chapterId,
      subjectId: subjectId || chapter.subjectId || null,
      order: order || 0,
      resources: resources || [],
      createdBy: req.user?._id || null,
    });

    // Populate the created topic with references
    const populatedTopic = await Topic.findById(topic._id)
      .populate("chapterId", "name chapterNo")
      .populate("subjectId", "name code")
      .populate("createdBy", "name email")
      .lean();

    return res.status(201).json({
      success: true,
      message: "Topic created successfully",
      data: populatedTopic,
    });
  } catch (error) {
    console.error("Error in createTopic:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A topic with this name already exists in the chapter",
        error: error.message,
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error while creating topic",
        errors: errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while creating topic. Please try again later",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getSubjectTopics = async (req, res) => {
  try {
    const { subjectId, chapterId } = req.query;
    const { page = 1, limit = 10, sortBy = "order", sortOrder = "asc" } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (subjectId) {
      if (!isValidObjectId(subjectId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid subject ID format. Please provide a valid ObjectId",
          field: "subjectId",
        });
      }
      filter.subjectId = subjectId;
    }

    if (chapterId) {
      if (!isValidObjectId(chapterId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid chapter ID format. Please provide a valid ObjectId",
          field: "chapterId",
        });
      }
      filter.chapterId = chapterId;
    }

    // Check if at least one filter is provided
    if (!subjectId && !chapterId) {
      return res.status(400).json({
        success: false,
        message: "Either subjectId or chapterId must be provided",
      });
    }

    // Check if subject or chapter exists
    if (subjectId) {
      await checkExists(Subject, subjectId, "Subject");
    }
    if (chapterId) {
      await checkExists(Chapter, chapterId, "Chapter");
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Get topics with pagination
    const [topics, totalCount] = await Promise.all([
      Topic.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .populate("chapterId", "name chapterNo")
        .populate("subjectId", "name code")
        .populate("prerequisites", "name")
        .populate("createdBy", "name email")
        .lean(),
      Topic.countDocuments(filter),
    ]);

    if (topics.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No topics found for ${subjectId ? "subject" : "chapter"} ID: ${subjectId || chapterId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Topics retrieved successfully",
      data: topics,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalItems: totalCount,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error in getSubjectTopics:", error);

    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while retrieving topics. Please try again later",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "Topic ID is required",
        field: "topicId",
      });
    }

    if (!isValidObjectId(topicId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid topic ID format. Please provide a valid ObjectId",
        field: "topicId",
      });
    }

    // Get topic with all related data
    const topic = await Topic.findById(topicId)
      .populate("chapterId", "name chapterNo description")
      .populate("subjectId", "name code description")
      .populate("prerequisites", "name description")
      .populate("resources.uploadedBy", "name email")
      .populate("createdBy", "name email role")
      .populate("updatedBy", "name email role")
      .lean();

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: `Topic with ID ${topicId} not found`,
      });
    }

    // Check if topic is active
    if (!topic.isActive) {
      return res.status(404).json({
        success: false,
        message: "This topic has been deactivated",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Topic retrieved successfully",
      data: topic,
    });
  } catch (error) {
    console.error("Error in getTopic:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while retrieving topic. Please try again later",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { name, description, order, resources, isActive, prerequisites } = req.body;

    // Validate topicId
    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "Topic ID is required",
        field: "topicId",
      });
    }

    if (!isValidObjectId(topicId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid topic ID format. Please provide a valid ObjectId",
        field: "topicId",
      });
    }

    // Check if topic exists
    const existingTopic = await checkExists(Topic, topicId, "Topic");

    // Build update object
    const updateData = {};

    if (name && name.trim() !== "") {
      // Check for duplicate name (excluding current topic)
      const duplicate = await Topic.findOne({
        chapterId: existingTopic.chapterId,
        name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
        _id: { $ne: topicId },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `A topic with the name "${name}" already exists in this chapter`,
          field: "name",
        });
      }
      updateData.name = name.trim();
    }

    if (description !== undefined) {
      updateData.description = description.trim() || "";
    }

    if (order !== undefined) {
      if (typeof order !== "number" || order < 0) {
        return res.status(400).json({
          success: false,
          message: "Order must be a positive number",
          field: "order",
        });
      }
      updateData.order = order;
    }

    if (resources !== undefined) {
      if (!Array.isArray(resources)) {
        return res.status(400).json({
          success: false,
          message: "Resources must be an array",
          field: "resources",
        });
      }
      updateData.resources = resources;
    }

    if (prerequisites !== undefined) {
      if (!Array.isArray(prerequisites)) {
        return res.status(400).json({
          success: false,
          message: "Prerequisites must be an array of topic IDs",
          field: "prerequisites",
        });
      }

      // Validate prerequisite IDs
      for (const prereqId of prerequisites) {
        if (!isValidObjectId(prereqId)) {
          return res.status(400).json({
            success: false,
            message: `Invalid prerequisite ID format: ${prereqId}`,
            field: "prerequisites",
          });
        }
        // Check if prerequisite exists
        await checkExists(Topic, prereqId, "Prerequisite topic");
      }
      updateData.prerequisites = prerequisites;
    }

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isActive must be a boolean value",
          field: "isActive",
        });
      }
      updateData.isActive = isActive;
    }

    // Add updatedBy if user is authenticated
    if (req.user?._id) {
      updateData.updatedBy = req.user._id;
      updateData.version = existingTopic.version + 1;
    }

    // Update the topic
    const updatedTopic = await Topic.findByIdAndUpdate(topicId, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    })
      .populate("chapterId", "name chapterNo")
      .populate("subjectId", "name code")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .lean();

    return res.status(200).json({
      success: true,
      message: "Topic updated successfully",
      data: updatedTopic,
    });
  } catch (error) {
    console.error("Error in updateTopic:", error);

    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error while updating topic",
        errors: errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while updating topic. Please try again later",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { permanent = false } = req.query;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "Topic ID is required",
        field: "topicId",
      });
    }

    if (!isValidObjectId(topicId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid topic ID format. Please provide a valid ObjectId",
        field: "topicId",
      });
    }

    // Check if topic exists
    const topic = await checkExists(Topic, topicId, "Topic");

    // Check if topic has dependencies (e.g., questions, assignments)
    const dependencies = await checkTopicDependencies(topicId);
    if (dependencies.hasDependencies) {
      return res.status(409).json({
        success: false,
        message: `Cannot delete topic as it has existing dependencies: ${dependencies.details.join(", ")}`,
        dependencies: dependencies.details,
        suggestion: "Consider deactivating the topic instead of deleting it",
      });
    }

    if (permanent === "true") {
      // Permanent delete
      await Topic.findByIdAndDelete(topicId);

      return res.status(200).json({
        success: true,
        message: `Topic "${topic.name}" permanently deleted successfully`,
        data: {
          deletedId: topicId,
          deletedName: topic.name,
        },
      });
    } else {
      // Soft delete - set isActive to false
      const deletedTopic = await Topic.findByIdAndUpdate(
        topicId,
        {
          isActive: false,
          deletedAt: new Date(),
          deletedBy: req.user?._id || null,
        },
        { new: true },
      );

      return res.status(200).json({
        success: true,
        message: `Topic "${topic.name}" deactivated successfully. Use permanent=true to delete permanently.`,
        data: deletedTopic,
      });
    }
  } catch (error) {
    console.error("Error in deleteTopic:", error);

    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while deleting topic. Please try again later",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Helper function to check topic dependencies
const checkTopicDependencies = async (topicId) => {
  const dependencies = [];
  const details = [];

  // Check for questions
  const Question = mongoose.model("Question");
  const questionCount = await Question.countDocuments({ topicId });
  if (questionCount > 0) {
    dependencies.push("questions");
    details.push(`${questionCount} question(s)`);
  }

  // Check for assignments
  const Assignment = mongoose.model("Assignment");
  const assignmentCount = await Assignment.countDocuments({ topicId });
  if (assignmentCount > 0) {
    dependencies.push("assignments");
    details.push(`${assignmentCount} assignment(s)`);
  }

  // Check if topic is a prerequisite for other topics
  const dependentTopics = await Topic.find({ prerequisites: topicId });
  if (dependentTopics.length > 0) {
    dependencies.push("prerequisites");
    details.push(`${dependentTopics.length} topic(s) depend on this`);
  }

  // Check for student progress
  const Progress = mongoose.model("Progress");
  const progressCount = await Progress.countDocuments({ topicId });
  if (progressCount > 0) {
    dependencies.push("progress");
    details.push(`${progressCount} student progress record(s)`);
  }

  return {
    hasDependencies: dependencies.length > 0,
    dependencies,
    details,
  };
};

export const bulkCreateTopics = async (req, res) => {
  try {
    const { topics, chapterId } = req.body;

    if (!chapterId) {
      return res.status(400).json({
        success: false,
        message: "Chapter ID is required for bulk creation",
        field: "chapterId",
      });
    }

    if (!isValidObjectId(chapterId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chapter ID format",
        field: "chapterId",
      });
    }

    await checkExists(Chapter, chapterId, "Chapter");

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Topics array is required and cannot be empty",
      });
    }

    // Validate and prepare topics
    const preparedTopics = topics.map((topic, index) => ({
      name: topic.name?.trim(),
      description: topic.description?.trim() || "",
      chapterId,
      subjectId: topic.subjectId || null,
      order: topic.order || index,
      resources: topic.resources || [],
      createdBy: req.user?._id || null,
    }));

    // Check for duplicates
    const names = preparedTopics.map((t) => t.name);
    const existingTopics = await Topic.find({
      chapterId,
      name: { $in: names },
    });

    if (existingTopics.length > 0) {
      const existingNames = existingTopics.map((t) => t.name);
      return res.status(409).json({
        success: false,
        message: `Duplicate topics found: ${existingNames.join(", ")}`,
        duplicateNames: existingNames,
      });
    }

    // Insert all topics
    const createdTopics = await Topic.insertMany(preparedTopics, {
      runValidators: true,
    });

    return res.status(201).json({
      success: true,
      message: `${createdTopics.length} topics created successfully`,
      data: createdTopics,
    });
  } catch (error) {
    console.error("Error in bulkCreateTopics:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error while creating topics",
        errors: errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while bulk creating topics. Please try again later",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};


*/
