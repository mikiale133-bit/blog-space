import Follow from "../models/followModel.js";
import User from "../models/userModel.js";

// import asyncHandler from "express-async-handler";

export const followUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const follower = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Prevent self-following
    if (follower.toString() === userId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    const alreadyFollowed = await Follow.findOne({
      follower,
      following: userId,
    });

    if (alreadyFollowed) {
      return res.status(400).json({ message: "You are already following this user." });
    }

    const newFollow = await Follow.create({
      follower,
      following: userId,
    });

    await User.findByIdAndUpdate(follower, { $inc: { followings: 1 } });
    await User.findByIdAndUpdate(userId, { $inc: { followers: 1 } });

    // await Follow.save();

    res.status(201).json(newFollow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    const follower = req.user._id;

    const follow = await Follow.findOneAndDelete({
      follower,
      following: id,
    });

    await User.findByIdAndUpdate(follower, { $inc: { following: -1 } });
    await User.findByIdAndUpdate(id, { $inc: { followers: -1 } });

    res.status(200).json({ message: "Unfollowed Successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;

    const followers = await Follow.find({ following: id }).populate("follower", "name profile_img");

    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowings = async (req, res) => {
  try {
    const followings = await Follow.find({
      follower: req.user._id,
    }).populate("following", "name profile_img");

    res.status(200).json(followings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add this new controller function
export const checkFollowStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user._id;

    // Prevent self-check (optional)
    if (followerId.toString() === userId) {
      return res.status(200).json({ isFollowing: false, isSelf: true });
    }

    const follow = await Follow.findOne({
      follower: followerId,
      following: userId,
    });

    res.status(200).json({
      isFollowing: !!follow, // true if follow exists, false otherwise
      isSelf: followerId.toString() === userId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
