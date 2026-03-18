// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if Authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user from the token (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Not authorized, token failed" });
    }

    if (!token) {
      res.status(401).json({ msg: "Not authorized, no token" });
    }
  }
};
