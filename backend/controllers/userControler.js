// bcrypt, jwt, User
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import { upload } from "../middleware/imgUpload.js";
import { cloudinary } from "../config/cloudinary.js";

/*@desc    Register new user
  @route   POST /api/users
  @access  Public */

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  // Exclude password field

  if (!users) {
    return res.status(404).json({ msg: "No users found" });
  }
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  // Exclude password field

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.json(user);
};

export const registerUser = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // 1. Basic Validation
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      if (!req.file) {
        return res.status(400).json({ msg: "Please upload an image" });
      }

      // 2. Check if user exists (Added RETURN here)
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // 3. Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 2. THE MISSING STEP: Upload the file to Cloudinary
      // req.file.path comes from Multer, result comes from Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles", // Optional: organizes images in Cloudinary
      });

      // 4. Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profile_img: {
          public_id: req.file.filename,
          url: req.file.path,
        },
      });

      if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ msg: "Invalid user data" });
      }
    } catch (error) {
      console.error("Register Error:", error);
      res.status(500).json({ msg: "Server error" });
    }
  },
];

/*@desc    Authenticate a user
  @route   POST /api/users/login  
  @access  Public*/

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check for user email - Find the user by email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ msg: "Invalid credentials" });
  }
};

/*@desc    Get user data
  @route   GET /api/users/me
  @access  Private*/
export const getMe = async (req, res) => {
  res.status(200).json(req.user);
  console.log(req.user);
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
