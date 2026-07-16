import Student from "../models/students.js";
import Teacher from "../models/teachers.js";
import User from "../models/userModel.js";

export const createTeacher = async (req, res) => {
  try {
    const { subject, classes } = req.body;

    if (!subject) {
      return res.status(400).json({ message: "Subject is required to create teacher" });
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
      subject,
    });

    await User.findByIdAndUpdate(req.user._id, { role: "teacher" });

    teacher.populate("accountId", "name email profile_img");
    res.status(201).json({ message: "teacher created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMystudents = async (req, res) => {
  try {
    const { classId } = req.params;
    if (!classId)
      return res.status(400).json({
        message: "class ID is required",
      });

    const students = await Student.find({ classId }).populate("accountId", "name email profile_img");

    res.status(200).json({ success: true, students });
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
