import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
  },

  { timestamps: true },
);

messageSchema.index({ createdAt: -1, _id: -1 });

const Message = mongoose.model("Message", messageSchema);
export default Message;
