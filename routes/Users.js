const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/userController");

router.route("/").get(userController.getAllUsers);

router.route("/:id").get(userController.getUserById);

router.route("/:id").put(userController.updateUser);

router.route("/:id").delete(userController.deleteUser);

module.exports = router;
