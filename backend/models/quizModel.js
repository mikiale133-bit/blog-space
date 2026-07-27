import mongoose from "mongoose";

// 1. Define the Schema for Individual Questions (Subdocument)
const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["MCQ", "TrueFalse", "ShortAnswer"],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      // Only required if it's an MCQ
      required: function () {
        return this.type === "MCQ";
      },
    },
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const submissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    files: [
      {
        url: String,
        name: String,
        size: Number,
        type: String,
      },
    ],
    textSubmission: String,
    status: {
      type: String,
      enum: ["pending", "submitted", "graded", "returned"],
      default: "pending",
    },
    grade: {
      score: Number,
      maxScore: Number,
      percentage: Number,
    },
    feedback: String,
    submittedAt: Date,
    gradedAt: Date,
    returnedAt: Date,
  },
  { timestamps: true },
);

// 2. Define the Main Quiz Schema
const quizSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft", // Allows saving for later!
      required: true,
    },

    // Meta Data
    topic: String,
    tags: [String],
    description: String,
    instructions: [String],
    scheduleDate: Date, // When it goes live
    duration: Number, // Duration in minutes

    // The Magic Array: Holds all 15+ mixed questions in one document
    questions: [questionSchema],
    submissions: [submissionSchema],
  },
  { timestamps: true },
);

// Indexes for fast dashboard fetching
quizSchema.index({ classId: 1, status: 1 });
quizSchema.index({ createdAt: -1 });

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
