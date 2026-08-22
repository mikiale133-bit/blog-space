import Subject from "../models/curricullum/Subject.js";
import Student from "../models/students.js";
import Teacher from "../models/teachers.js";
import User from "../models/userModel.js";

export const createTeacher = async (req, res) => {
  try {
    const { subjectId, classes } = req.body;

    if (!subjectId) {
      return res.status(400).json({ message: "Subject is required to create teacher" });
    }

    if (!classes) {
      return res.status(400).json({ message: "Please select your Classes." });
    }

    const alreadyExist = await Teacher.findOne({ accountId: req.user._id });
    if (alreadyExist) {
      return res.status(400).json({ message: "Teacher already existed" });
    }

    const user = await User.findById(req.user._id);
    if (user.role !== "user") {
      return res.status(403).json({ message: `${req.user.role}s are not able to register as teacher.` });
    }

    const teacher = await Teacher.create({
      accountId: req.user._id,
      classes,
      subjectId,
    });

    await User.findByIdAndUpdate(req.user._id, { role: "teacher" });

    teacher.populate("accountId", "name email profile_img");
    res.status(201).json({ message: "teacher created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("accountId", "name email profile_pic");

    res.status(200).json({ success: true, teachers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTeacher = async (req, res) => {
  try {
    const accountId = req.user._id;
    const teacher = await Teacher.findOne({ accountId }).populate("accountId", "name email profile_img").populate("classes", "department section");

    res.status(200).json({ success: true, teacher });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const assignSubject = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { subjectId } = req.body;

    // Authorization
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Only admins can assign subjects.",
      });
    }

    // Check if teacher exists and add subject in one query
    // const teacher = await Teacher.findByIdAndUpdate(
    //   teacherId,
    //   {
    //     $addToSet: { subjects: subjectId }, // Prevents duplicates
    //   },
    //   {
    //     new: true, // Return updated document
    //     runValidators: true,
    //   },
    // ).populate("subjects");

    const teacher = await Teacher.findByIdAndUpdate(teacherId, { subjectId: subjectId });

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    // Check if subject exists (optional - but good practice)
    // const subject = await Subject.findById(subjectId);
    // if (!subject) {
    //   // Remove the subject we just added since it doesn't exist
    //   await Teacher.findByIdAndUpdate(teacherId, {
    //     $pull: { subjects: subjectId },
    //   });

    //   return res.status(404).json({
    //     message: "Subject not found",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Subject assigned to teacher successfully",
    });
  } catch (error) {
    console.error("Error assigning subject:", error);
    res.status(500).json({
      success: false,
      message: "Server error while assigning subject",
      error: error.message,
    });
  }
};

export const getTeacherSubject = async (req, res) => {
  try {
    // // Authorization
    // if (!req.user || req.user.role !== "admin") {
    //   return res.status(403).json({
    //     message: "Access denied. Only admins can assign subjects.",
    //   });
    // }

    const teacher = await Teacher.findOne({ accountId: req.user._id }).populate("subectId", "name");

    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (error) {
    console.error("Error assigning subject:", error);
    res.status(500).json({
      success: false,
      message: "Server error while assigning subject",
      error: error.message,
    });
  }
};
