const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const newUser = await User.create({ ...req.body });
  res.status(201).json(newUser);
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findOneAndDelete({ _id: userId });
  if (deletedUser) {
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
