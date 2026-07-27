import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    attachments: {
      files: [
        {
          url: String,
          name: String,
          size: Number,
          type: String,
        },
      ],
      textSubmission: String,
    },

    status: {
      type: String,
      enum: ["pending", "submitted", "graded", "returned"],
      default: "pending",
    },

    mark: {
      type: Number,
    },

    feedback: String,
    submittedAt: Date,
  },
  { timestamps: true },
);

const assessmentSchema = mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "draft",
    },
    title: String,
    description: String,
    tags: [String],
    instructions: [String],
    dueDate: Date,

    content: String,
    submissions: [submissionSchema],
  },
  { timestamps: true },
);
const Assessment = mongoose.model("Assessment", assessmentSchema);
export default Assessment;
