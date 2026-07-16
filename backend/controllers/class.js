import Class from "../models/class.js";
import Group from "../models/groupModel.js";
import Quiz from "../models/quizModel.js";
import Student from "../models/students.js";
import Teacher from "../models/teachers.js";

export const createClass = async (req, res) => {
  try {
    const { department, section } = req.body;
    if (!department || !section) {
      return res.status(400).json({ message: "please include department and section of the class" });
    }

    if (req.user.role === "student") {
      return res.status(403).json({ message: "sorry, You are not admin." });
    }

    await Class.create({
      department,
      section,
    });

    res.status(200).json({ message: "Class created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// FOR TEACHER _ ALSO ADMIN
export const getMyClass = async (req, res) => {
  const { classId } = req.params;
  try {
    const myClass = await Class.findById(classId);

    res.status(200).json({ myClass });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyClasses = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const teacher = await Teacher.findById(teacherId);
    const myClasses = await Class.find({ _id: { $in: teacher.classes } });

    res.status(200).json({ myClasses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getClasses = async (req, res) => {
  const classes = await Class.find();
  res.status(200).json({ classes });
};

export const getClass = async (req, res) => {
  const classRoom = await Class.findById(req.params.classId);
  res.status(200).json({ classRoom });
};

// ******* GROUPS ******* //
export const createGroup = async (req, res) => {
  try {
    const { groupName, students } = req.body;
    const { classId } = req.params;
    const group = await Group.create({
      name: groupName,
      classId,
      students,
    });

    await Student.updateMany({ _id: { $in: students } }, { $set: { group: group._id } });

    await group.populate({
      path: "students",
      populate: {
        path: "accountId",
        select: "name email profile_pic",
      },
    });
    res.status(200).json({ message: "Group created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const { classId } = req.params;
    const groups = await Group.find({ classId }).populate({
      path: "students",
      populate: {
        path: "accountId",
        select: "name email profile_pic",
      },
    });
    res.status(200).json({ groups });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeStudentFromGroup = async (req, res) => {
  try {
    const { groupId, studentId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    group.students.pull(studentId);
    await group.save();

    await Student.findByIdAndUpdate(studentId, { group: null });
    res.status(200).json({ message: "Student removed from group successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addStudentsToGroup = async (req, res) => {
  try {
    const { groupId, studentsIds } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    studentsIds.map((id) => {
      if (group.students.includes(id)) {
        return res.status(400).json({ message: "You are adding a student already in group" });
      }
    });

    await Student.updateMany({ _id: { $in: studentsIds } }, { $set: { group: groupId } });
    group.students.push(studentsIds);
    await group.save();
    res.status(201).json({ message: "Student added to group successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);

    await Student.updateMany({ _id: { $in: group.students } }, { $set: { group: null } });

    await Group.findByIdAndDelete(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const nullgroup = async (req, res) => {
  await Student.updateMany({}, { $set: { group: null } });
};
// QUIZZES
export const createQuiz = async (req, res) => {
  try {
    const { classId } = req.params;
    const { title, status, topic, description, instructions, scheduleDate, duration, questions } = req.body;
    const quiz = await Quiz.create({
      classId,
      createdBy: req.user._id,
      title,
      status,
      topic,
      description,
      instructions,
      scheduleDate,
      duration,
      questions,
    });
    res.status(201).json({ quiz });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const { classId } = req.params;
    const quizzes = await Quiz.find({ classId }).populate("createdBy", "name email");
    res.status(200).json({ quizzes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId).populate("createdBy", "name email");
    res.status(200).json({ quiz });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
