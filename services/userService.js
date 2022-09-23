const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  return User.find();
};

const createUser = async (req, res) => {
  const { name, email, password, company } = req.body;
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    password: secPass,
    company,
  });
  const user1 = await user.save();
  return user1;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};
const updateUser = async (req) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
  });
  const u1 = await User.findById(req.params.id);
  return u1;
};

const deleteUser = async (id) => {
  const users = await User.findByIdAndRemove(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
