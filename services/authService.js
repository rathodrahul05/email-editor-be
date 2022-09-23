const User = require("../models/user");
const tokenService = require("./tokenService");
const userService = require("./userService");

const loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return user;
  }
};

const signUp = () => {};
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      "refresh",
      "iamaprocoder!!"
    );
    if (
      refreshTokenDoc.email == "admin@gmail.com" &&
      refreshTokenDoc.password == "Admin"
    ) {
      return tokenService.generateAuthTokens(refreshTokenDoc);
    } else {
      throw new Error();
    }
   
  } catch (error) {
    console.log(error, "please auth");
   
  }
};
module.exports = {
  loginUser,
  signUp,
  refreshAuth,
};
