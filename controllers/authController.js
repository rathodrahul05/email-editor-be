const authService = require("../services/authService");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
  const user = await authService.loginUser(req, res);
  if (!user) {
    return res.status(401).send({ message: "Invalid credentials" });
  }
  const passwordCompare = await bcryptjs.compare(
    req.body.password,
    user.password
  );
  if (!passwordCompare) {
    return res.status(401).send({ message: "Invalid credentials" });
  }
  const token = await tokenService.generateAuthTokens(user);
  res.json({...token,user:user.name});
};

const signUp = async (req, res) => {
  let user1 = await User.findOne({ email: req.body.email });
  if (user1) {
    return res
      .status(400)
      .json({ error: "Sorry a user with this email already exists" });
  }
  const user = await userService.createUser(req, res);
  if (user) {
    res.send({ message: "user signed up successfully", user });
  }
};

const refreshTokens = async (req, res) => {
  console.log("hi");
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
};

module.exports = {
  login,
  signUp,
  refreshTokens,
};
