import Group from "../models/groupModel.js";
import Student from "../models/students.js";
import Teacher from "../models/teachers.js";
import User from "../models/userModel.js";

export const createStudent = async (req, res) => {
  try {
    const { classId } = req.body;

    if (!classId) {
      return res.status(201).json({ message: "Please provide classId." });
    }

    const alreadyExist = await Student.findOne({ accountId: req.user._id });
    if (alreadyExist) {
      return res.status(400).json({ message: "You are already registered. go to your class." });
    }

    // check If User role is "user"
    const user = await User.findById(req.user._id);

    if (user.role !== "user") {
      return res.status(403).json({ message: "Only users can be registered as students" });
    }

    const student = await Student.create({
      accountId: req.user._id,
      classId,
    });

    await User.findByIdAndUpdate(req.user._id, { role: "student" });

    student.populate("accountId", "name email profile_img");
    res.status(201).json({ message: "student created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET CLASS STUDENTS
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

export const getAllstudents = async (req, res) => {
  try {
    const students = await Student.find().populate("accountId", "name email profile_img");

    res.status(200).json({ success: true, students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const studentGetMe = async (req, res) => {
  try {
    const student = await Student.findOne({ accountId: req.user._id }).populate("accountId", "name email profile_img");

    res.status(200).json({ success: true, student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
