const jwt = require("jsonwebtoken");
const moment = require("moment");

const jwt_secret = process.env.JWT_SECRET;
const jwt_secret_refresh = process.env.JWT_SECRET_REFRESH;

const generateToken = (userId, expires, type, secret = jwt_secret) => {
  console.log(secret);

  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const verifyToken = async (token, type, secret) => {
  const payload = jwt.verify(token, secret);
  const user = { email: payload.sub.toString(), password: "Admin" };

  return user;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(1, "days");
  const accessToken = generateToken(user.id, accessTokenExpires, "access");

  const refreshTokenExpires = moment().add(10, "days");
  const refreshToken = generateToken(
    user.email,
    refreshTokenExpires,
    "refresh",
    jwt_secret_refresh
  );
  // await saveToken(refreshToken, user.email, refreshTokenExpires, "refresh");

  return {
    message: "Login successfull",
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateAuthTokens,
  verifyToken,
};
