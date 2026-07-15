import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    department: String,
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
    isCoordinator: {
      type: Boolean,
      default: false,
    },
    attendance: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true },
);

studentSchema.index({ createdAt: -1, _id: -1 });

const Student = mongoose.model("Student", studentSchema);
export default Student;
