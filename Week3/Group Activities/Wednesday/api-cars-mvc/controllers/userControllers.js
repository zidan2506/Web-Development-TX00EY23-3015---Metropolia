const { json } = require("express");
const User = require("../models/userModel");


// GET /users
const getAllUsers = (req, res) => {
  const users = User.getAll();
  res.json(users);
};

// POST /users
const createUser = (req, res) => {
  // res.json({ message: "Hello from create" });
  const newUser = User.addOne({ ...req.body });
  if (newUser) {
    res.json(newUser);
  } else {
    res.status(500).json({ message: "Failed to create new user!"})
  }
};

// GET /users/:userId
const getUserById = (req, res) => {
  // res.json({ message: "Hello from getById" });
  const user = User.findById(req.params.userId);
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({message: "user not found"});
  }
};

// PUT /users/:userId
const updateUser = (req, res) => {
  // res.json({ message: "Hello from update" });
  const userId = req.params.userId;
  const updatedUser = User.updateOneById(userId, {...req.body});

  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({message: "User not found!"})
  }
};

// DELETE /users/:userId
const deleteUser = (req, res) => {
  // res.json({ message: "Hello from delete" });
  const userId = req.params.userId;
  const isDeleted = User.deleteOneById(userId);

  if (isDeleted) {
    res.json({message: "Delete user successfully!"})
  } else {
    res.status(404).json({message: "User not found!"})
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
