import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
    name: String,
  },
  { timestamps: true },
);
const Topic = mongoose.model("Topic", subjectSchema);
export default Topic;
