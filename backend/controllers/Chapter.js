import Chapter from "../models/curricullum/Chapter.js";

export const createChapter = async (req, res) => {
  try {
    const { name, subjectId } = req.body;

    // Validation
    if (!subjectId) {
      return res.status(400).json({
        message: "Please provide subjectId for the chapter",
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "Please provide a unique name for the chapter",
      });
    }

    // // Authorization
    // if (req.user.role === "student") {
    //   return res.status(403).json({ message: "Access denied. Admin only." });
    // }

    // Check if chapter already exists
    const existingChapter = await Chapter.findOne({
      subjectId,
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existingChapter) {
      return res.status(409).json({
        message: "Chapter with this name already exists for this subject",
      });
    }

    await Chapter.create({
      subjectId,
      name,
    });

    res.status(201).json({
      success: true,
      message: "Chapter created successfully",
    });
  } catch (error) {
    console.error("Error creating chapter:", error);
    res.status(500).json({
      message: "Server error while creating chapter. Please try again later.",
    });
  }
};

// FOR ADMIN
export const getAllChapters = async (req, res) => {
  try {
    // Authorization - optional admin check
    if (req.user.role === "student") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const chapters = await Chapter.find().populate("classId", "name").populate("subjectId", "name");

    res.status(200).json({
      success: true,
      count: chapters.length,
      chapters,
    });
  } catch (error) {
    console.error("Error fetching all chapters:", error);
    res.status(500).json({
      message: "Server error while fetching chapters. Please try again later.",
    });
  }
};

export const getSubjectChapters = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const chapters = await Chapter.find({ subjectId }).populate("subjectId", "name");

    if (chapters.length === 0) {
      return res.status(404).json({
        message: "No chapters found for this subject.",
      });
    }

    res.status(200).json({
      success: true,
      count: chapters.length,
      chapters,
    });
  } catch (error) {
    console.error("Error fetching class chapters:", error);
    res.status(500).json({
      message: "Server error while fetching class chapters. Please try again later.",
    });
  }
};

export const getChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;

    if (!chapterId) {
      return res.status(400).json({ message: "Chapter ID is required" });
    }

    const chapter = await Chapter.findById(chapterId).populate("subjectId", "name");

    if (!chapter) {
      return res.status(404).json({
        message: `Chapter with ID ${chapterId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      chapter,
    });
  } catch (error) {
    console.error("Error fetching chapter:", error);
    res.status(500).json({
      message: "Server error while fetching chapter details. Please try again later.",
    });
  }
};

export const updateChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { name } = req.body;

    // Authorization
    if (req.user.role === "student") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    if (!chapterId) {
      return res.status(400).json({ message: "Chapter ID is required" });
    }

    // Check if chapter exists
    const existingChapter = await Chapter.findById(chapterId);
    if (!existingChapter) {
      return res.status(404).json({
        message: `Chapter with ID ${chapterId} not found`,
      });
    }

    // Check for duplicate name if name is being updated
    if (name && name !== existingChapter.name) {
      const duplicateChapter = await Chapter.findOne({
        _id: { $ne: chapterId },
        subjectId: subjectId || existingChapter.subjectId,
        name: { $regex: new RegExp(`^${name}$`, "i") },
      });

      if (duplicateChapter) {
        return res.status(409).json({
          message: "Another chapter with this name already exists for this subject.",
        });
      }
    }

    const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, { name }, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: "Chapter updated successfully",
      chapter: updatedChapter,
    });
  } catch (error) {
    console.error("Error updating chapter:", error);
    res.status(500).json({
      message: "Server error while updating chapter. Please try again later.",
    });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;

    // Authorization
    if (req.user.role === "student") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    if (!chapterId) {
      return res.status(400).json({ message: "Chapter ID is required" });
    }

    // Check if chapter exists
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({
        message: `Chapter with ID ${id} not found`,
      });
    }

    // Optional: Check if chapter has any associated content (lessons, quizzes, etc.)

    await Chapter.findByIdAndDelete(chapterId);

    res.status(200).json({
      success: true,
      message: "Chapter deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    res.status(500).json({
      message: "Server error while deleting chapter. Please try again later.",
    });
  }
};
