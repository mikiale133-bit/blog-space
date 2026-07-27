import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      unique: true, // <-- CRUCIAL: Ensures ONE resource container per Topic!
    },

    videos: [
      {
        public_id: { type: String },
        url: { type: String, required: true },
        duration: { type: Number }, // Store video length in seconds
        metadata: {
          originalName: String,
          sizeInBytes: Number,
        },
      },
    ],

    note: {
      type: String, // Store HTML or Markdown here
      default: "",
    },

    // THE POWERPOINT (Downloadable #1) ---
    powerPoint: {
      public_id: { type: String },
      url: { type: String, required: true },
      metadata: {
        originalName: { type: String, default: "lecture_slides.pptx" },
        mimeType: { type: String, default: "application/vnd.ms-powerpoint" },
        sizeInBytes: { type: Number },
      },
    },

    // --- 4. THE DOCX / PDF (Downloadable #2) ---
    attachment: {
      public_id: { type: String },
      url: { type: String, required: true },
      metadata: {
        originalName: { type: String, default: "lecture_notes.docx" },
        mimeType: { type: String, default: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
        sizeInBytes: { type: Number },
      },
    },

    // IMAGES (Gallery/Screenshots) ---
    images: [
      {
        public_id: { type: String },
        url: { type: String, required: true },
        caption: { type: String }, // Useful for explaining the image
        metadata: {
          originalName: String,
          sizeInBytes: Number,
        },
      },
    ],

    quizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],

    // ---  METADATA & AUDIT ---
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true },
);

// Compound index to ensure fast lookups when fetching by Topic
resourceSchema.index({ topicId: 1, classId: 1 });

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
