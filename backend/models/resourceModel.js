import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },

    // topic: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    resourceType: {
      type: String,
      required: true,
      enum: ["video", "audio", "image", "document", "slide", "note", "handout"],
    },
    // The actual link to the file stored on AWS S3, Cloudinary, etc.
    fileUrl: {
      public_id: { type: String },
      url: { type: String, required: true },
    },
    textContent: String,
    // Optional: Useful for rendering custom icons or description text
    description: {
      type: String,
      trim: true,
    },
    // Highly recommended metadata for file downloads
    fileMetadata: {
      originalName: String, // e.g., "lecture_notes.pptx"
      mimeType: String, // e.g., "application/vnd.ms-powerpoint"
      sizeInBytes: Number, // e.g., 5242880 (5MB)
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

resourceSchema.index({ createdAt: -1, _id: -1 });

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
