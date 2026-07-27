import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
  {
    code: String,
    name: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
  },
  { timestamps: true },
);
const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
