import multer from "multer";
import { storage } from "../config/cloudinary.js";

export const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 /* 5MB limit*/ },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image."), false);
    }
  },
});
