import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    type: {
      type: String,
      enum: ["comment", "question"],
      default: "comment",
    },
  },

  { timestamps: true },
);

commentSchema.index({ createdAt: -1, _id: -1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
