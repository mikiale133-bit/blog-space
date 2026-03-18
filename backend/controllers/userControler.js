// bcrypt, jwt, User
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/*@desc    Register new user
  @route   POST /api/users
  @access  Public */

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password"); // Exclude password field

  if (!users) {
    return res.status(404).json({ msg: "No users found" });
  }
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.findOne({ name: req.params.name });
  // Exclude password field

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.json(user);
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    res.json({ msg: "user already exists" });
  }

  // hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // data about the registered user
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
};

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
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
