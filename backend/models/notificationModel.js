import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["chat", "platform"],
    },
    content: {
      type: String,
      required: true,
    },
  },

  { timestamps: true },
);

notificationSchema.index({ createdAt: -1, _id: -1 });

const Message = mongoose.model("Notification", notificationSchema);
export default Notification;
