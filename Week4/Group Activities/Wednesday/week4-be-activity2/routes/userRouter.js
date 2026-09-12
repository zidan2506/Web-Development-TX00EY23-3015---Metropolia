const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);

router.post("/", createUser);

router.get("/:userId", getUserById);

router.delete("/:userId", deleteUser);

module.exports = router;
