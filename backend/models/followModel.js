import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
  },

  { timestamps: true },
);

followSchema.index({ createdAt: -1, _id: -1 });

const Follow = mongoose.model("Follow", followSchema);
export default Follow;
