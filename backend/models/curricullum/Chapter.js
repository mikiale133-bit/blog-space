import mongoose from "mongoose";

const chapterSchema = mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    name: String,
    chapterNumber: Number,
    totalTimeScreen: Number, //e.g you spend 19 hours on this chapterthis week  or 3 hours spent today
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],

    learningObjectives: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.every((obj) => obj.length <= 500);
        },
        message: "Each learning objective cannot exceed 500 characters",
      },
      default: [],
    },
    metadata: {
      totalQuestions: {
        type: Number,
        default: 0,
        min: 0,
      },
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalReviews: {
        type: Number,
        default: 0,
        min: 0,
      },
      completionRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },
  },
  { timestamps: true },
);
const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;
