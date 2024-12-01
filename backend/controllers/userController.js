import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { io } from "../socket/socket.js";

const getUsers = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error getting Users", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, gender, bio } = req.body;
    const loggedInUserId = req.user._id;
    const user = await User.findByIdAndUpdate(
      loggedInUserId,
      { fullName, gender, bio },
      {
        new: true,
        select: "-password",
      }
    );

    if (user) {
      io.emit('profileUpdated', {
        userId: user._id,
        fullName: user.fullName,
        bio: user.bio,
      })
      res
        .status(200)
        .json({
          message: "Updated Successfully",
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          gender: user.gender,
          bio: user.bio,
          profilePic: user.profilePic,
        });
    } else {
        res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log("Error updating User", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { getUsers, updateUser };
