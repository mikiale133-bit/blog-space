import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true, // For faster population
    },
    title: {
      type: String,
      required: true,
      index: true, // For search features
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true, // For filtering by category
    },
    // tags: [String],
    image: {
      //cover image
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    gallaries: [{ public_id: String, url: String }],
  },
  { timestamps: true },
);

// Compound index for pagination (most important!)
postSchema.index({ createdAt: -1, _id: -1 });

// Index for user's posts
postSchema.index({ user: 1, createdAt: -1 });

const Post = mongoose.model("Post", postSchema);
export default Post;
