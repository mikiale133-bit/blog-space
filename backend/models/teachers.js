import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },

    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
  },

  { timestamps: true },
);

teacherSchema.index({ createdAt: -1, _id: -1 });

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
