import { upload } from "../config/classResources.js";
import Resource from "../models/resourceModel.js";

// export const addResource = [
//   upload.array("files"),
//   async (req, res) => {
//     try {
//       const { subject, chapter, title, description, topic, resourceType, textContent } = req.body;
//       const { classId } = req.params;

//       const filePublicId = req.file?.public_id || req.file?.filename;
//       const fileUrl = req.file?.url || req.file?.path;
//       const originalName = req.file?.originalname;
//       const mimeType = req.file?.mimetype;
//       const sizeInBytes = req.file?.size;

//       const isFile = ["video", "image", "audio", "document", "slide"].includes(resourceType);

//       const newResource = await Resource.create({
//         classId,
//         subject,
//         chapter,

//         // RESOURCE METADATA
//         title,
//         description,
//         topic,
//         createdBy: req.user._id,
//         resourceType,
//         fileUrl: isFile && fileUrl ? { public_id: filePublicId, url: fileUrl } : null,
//         textContent: textContent ? textContent : null,

//         videos: req.files.videos,
//         powerPoint: req.files.powerPoint,
//         docx: req.files.docx,

//         // Save metadata only if a file exists
//         fileMetadata:
//           isFile && req.file
//             ? {
//                 originalName,
//                 mimeType,
//                 sizeInBytes,
//               }
//             : undefined,
//       });

//       return res.status(201).json({
//         success: true,
//         message: "Resource created successfully!",
//         data: newResource,
//       });
//     } catch (error) {
//       console.error("Error creating resource:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to create resource.",
//         error: error.message,
//       });
//     }
//   },
// ];

// IMPORTANT: Change your route to use upload.fields() instead of upload.single()
// router.post("/class/:classId/resource", upload.fields([
//   { name: "video", maxCount: 1 },
//   { name: "powerPoint", maxCount: 1 },
//   { name: "attachment", maxCount: 1 },
//   { name: ", maxCount: 10 }
// ]), addResource);

export const createTopicResource = [
  upload.fields([
    { name: "videos", maxCount: 3 },
    { name: "powerPoint", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        subjectId,
        chapterId,
        topicId,
        note, // Rich text note (HTML/Markdown)
        status,
        quiz,
      } = req.body;

      console.log("BODY: ", req.body);

      // --- 1. VALIDATION ---
      if (!topicId) {
        return res.status(400).json({
          success: false,
          message: "topicId is required.",
        });
      }

      // Helper function to extract file data
      const extractFileData = (fileArray) => {
        if (!fileArray || fileArray.length === 0) return null;
        const file = fileArray[0];
        return {
          public_id: file.public_id || file.filename || null,
          url: file.url || file.path || null,
          metadata: {
            originalName: file.originalname || file.originalName || null,
            mimeType: file.mimetype || null,
            sizeInBytes: file.size || null,
          },
        };
      };

      const videoData = extractFileData(req.files.videos);
      const powerPointData = extractFileData(req.files.powerPoint);
      const attachmentData = extractFileData(req.files.attachment);

      const newResource = await Resource.create({
        subjectId,
        chapterId,
        topicId,

        videos: videoData || { url: "" }, // Ensure it exists even if empty
        note: note || "",
        powerPoint: powerPointData || { url: "" },
        attachment: attachmentData || { url: "" },
        quiz,
        createdBy: req.user._id,
        status: status || "draft",
      });

      return res.status(201).json({
        success: true,
        message: "Resource container created successfully!",
        data: newResource,
      });
    } catch (error) {
      console.error("Error in addResource:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create/update resource container.",
      });
    }
  },
];

export const getTopicResource = async (req, res) => {
  const { topicId } = req.params;
  const resource = await Resource.findOne({ topicId });
  res.status(200).json({ resource });
};

export const updateTopicResource = async (req, res) => {};

export const deleteTopicresource = async (req, res) => {};
