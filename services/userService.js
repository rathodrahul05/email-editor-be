const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer.config");
const { verifySocialUser } = require("./authService");

const getAllUsers = async () => {
  return User.find();
};

const createUser = async (req, res) => {
  const token = jwt.sign({ email: req.body.email }, "seckey!!");
  const { name, email, password, company } = req.body;
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    password: secPass,
    company,
    confirmationCode: token,
  });
  const user1 = await user.save();

  nodemailer.sendConfirmationEmail(
    user.name,
    user.email,
    user.confirmationCode
  );
  return user1;
};
const createSocialUser = async (req, res) => {
  // const token = jwt.sign({ email: req.body.email }, "seckey!!");
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
  const updatedUser = await verifySocialUser(req, res);
  console.log(updatedUser,45)

  return updatedUser;
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
  createSocialUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  
};
