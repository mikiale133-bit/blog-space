import { upload } from "../config/classResources.js";
import Resource from "../models/resourceModel.js";

export const addResource = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, description, topic, resourceType, textContent } = req.body;
      const { classId } = req.params;

      const filePublicId = req.file?.public_id || req.file?.filename;
      const fileUrl = req.file?.url || req.file?.path;
      const originalName = req.file?.originalname;
      const mimeType = req.file?.mimetype;
      const sizeInBytes = req.file?.size;

      const isFile = ["video", "image", "audio", "document", "slide"].includes(resourceType);

      const newResource = await Resource.create({
        classId,
        title,
        description,
        topic,
        createdBy: req.user._id,
        resourceType,

        fileUrl: isFile && fileUrl ? { public_id: filePublicId, url: fileUrl } : { url: textContent }, // Or save textContent to a dedicated 'content' field in your schema

        // Save metadata only if a file exists
        fileMetadata:
          isFile && req.file
            ? {
                originalName,
                mimeType,
                sizeInBytes,
              }
            : undefined,
      });

      return res.status(201).json({
        success: true,
        message: "Resource created successfully!",
        data: newResource,
      });
    } catch (error) {
      console.error("Error creating resource:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create resource.",
        error: error.message,
      });
    }
  },
];

export const getResources = async (req, res) => {
  const { classId } = req.params;
  const resources = await Resource.find({ classId });
  res.status(200).json({ resources });
};

export const getResourcesByType = async (req, res) => {
  const { type } = req.body;
  const { classId } = req.params;
  const resources = await Resource.find({ classId, resourceType: type });
  res.status(200).json({ resources });
};
