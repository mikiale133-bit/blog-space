import Chapter from "../models/curricullum/Chapter.js";
import Subject from "../models/curricullum/Subject.js";
import SubjectClass from "../models/curricullum/subjectClassTeacher.js";

export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "please include name of the subject" });
    }

    if (req.user.role === "student") {
      return res.status(403).json({ message: "sorry, You are not admin." });
    }

    await Subject.create({
      name,
    });

    res.status(200).json({ message: "Subject created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// FOR ADMIN
export const getAllSubjects = async (req, res) => {
  try {
    // Check if user is admin (optional)
    // if (req.user.role === "student") {
    //   return res.status(403).json({ message: "Access denied. Admin only." });
    // }

    const subjects = await Subject.find();

    res.status(200).json({
      success: true,
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getClassSubjects = async (req, res) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      return res.status(400).json({ message: "Class ID is required" });
    }

    const subjects = await SubjectClass.find({ classId }).pupulate({
      path: "subjectId",
      select: "name code chapters", //description, credits
    });

    res.status(200).json({
      success: true,
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const { subjectId } = req.params;

    if (!subjectId) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({
      success: true,
      subject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { name, classId } = req.body;

    // Check if user is admin
    if (req.user.role === "student") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    if (!subjectId) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    // Check if subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Update subject
    const updatedSubject = await Subject.findByIdAndUpdate(subjectId, { name, classId }, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      subject: updatedSubject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    // Check if user is admin
    if (req.user.role === "student") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    if (!subjectId) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    // Check if subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Delete subject
    await Subject.findByIdAndDelete(subjectId);

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubjectChapters = async (req, res) => {
  const { subjectId } = req.params;
  const chapters = await Chapter.find({ subjectId });

  res.status(200).json({ chapters });
};
/* 
  export const create = async (req, res) => {};

  export const getAll = async (req, res) => {};

  export const get = async (req, res) => {};

  export const update = async (req, res) => {};

  export const deleteA = async (req, res) => {};
*/
