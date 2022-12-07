const User = require("../models/user");
const tokenService = require("./tokenService");
const userService = require("./userService");

const loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return user;
  }
};

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
const verifyUser = async (req, res) => {
  let user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });

  
  if (user) {
    user.status = "Active";
    const temp=await user.save();
   
    return temp
  } else {
    return res.status(404).send({ message: "User Not found." });
  }
};
const verifySocialUser = async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });

  
  if (user) {
    user.status = "Active";
    const temp=await user.save();
   
    return temp
  } else {
    return res.status(404).send({ message: "User Not found." });
  }
};
const socialLoginUser=async(req,res)=>{
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const updatedUser = await verifySocialUser(req, res);
    return updatedUser;
  }
}

module.exports = {
  loginUser,
  refreshAuth,
  verifyUser,
  verifySocialUser,
  socialLoginUser
};
