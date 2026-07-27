import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
  {
    code: String,
    name: String,
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
  },
  { timestamps: true },
);
const Department = mongoose.model("Department", subjectSchema);
export default Department;
