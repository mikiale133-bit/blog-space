import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname); // .docx
    const name = path.basename(file.originalname, ext); // calendar

    return {
      folder: "class-resources",
      resource_type: "auto",
      public_id: `${name}-${Date.now()}${ext}`,
    };
  },
  // allowed_formats: [
  //   // Images
  //   "jpg",
  //   "jpeg",
  //   "png",
  //   "gif",
  //   "webp",

  //   // Videos
  //   "mp4",
  //   "mov",
  //   "avi",
  //   "mkv",
  //   "webm",

  //   // Audio
  //   "mp3",
  //   "wav",
  //   "ogg",
  //   "m4a",

  //   // Documents
  //   "pdf",
  //   "doc",
  //   "docx",
  //   "txt",

  //   // Slides
  //   "ppt",
  //   "pptx",
  // ],
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 /* 10MB limit*/ },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/quicktime",
      "audio/mpeg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
    ];
    console.log(file.mimetype);
    console.log(file.originalname);
    cb(null, allowed.includes(file.mimetype));
  },
});

export { cloudinary };
