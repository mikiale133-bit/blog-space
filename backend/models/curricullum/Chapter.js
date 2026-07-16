import mongoose from "mongoose";

const chapterSchema = mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    name: String,
  },
  { timestamps: true },
);
const Class = mongoose.model("Class", chapterSchema);
export default Class;
