import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);
const Post = mongoose.model("Post", postSchema);
export default Post;
