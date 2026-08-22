import Assessment from "../models/assessmentModel.js";

export const createAssessment = async (req, res) => {
  const { subjectId, title, description, instructions, tags, content, dueDate, classId } = req.body;

  await Assessment.create({
    classId,
    subjectId,
    title,
    tags,
    content,
    createdBy: req.user._id,
    dueDate,
    submissions: [],
  });

  res.status(200).json({ message: "Assessment created successfuly" });
};

export const submitAssessment = async (req, res) => {
  const { assessmentId } = req.params;
  const { submission } = req.body;

  const assessment = await Assessment.findById(assessmentId);
  assessment.submissions.push(submission);
  await assessment.save();

  res.status(200).json({ message: "Submitted successfuly" });
};

export const getSubjectAssessments = async (req, res) => {
  const { classId, subjectId } = req.params;
  const assessments = await Assessment.find({ classId, subjectId });
  res.status(200).json({ assessments });
};

export const getAssessment = async (req, res) => {
  const { assessmentId } = req.params;
  const assessment = await Assessment.findById(assessmentId);
  res.status(200).json({ assessment });
};

export const updateAssessment = async (req, res) => {
  const { assessmentId } = req.params;
  const assessment = await Assessment.findByIdAndUpdate(assessmentId, { new: true });

  res.status(200).json({ message: "Assessment updated successfully." });
};

export const deleteAssessment = async (req, res) => {
  const { assessmentId } = req.params;
  await Assessment.findByIdAndDelete(assessmentId);

  res.status(200).json({ message: "Assessment deleted successfully." });
};
