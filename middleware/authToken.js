const jwt = require("jsonwebtoken");

const config = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");

    const token = req.body.token || req.query.token || bearer[1];

    if (!token) {
      return res.status(403).send({
        status: 403,
        message: "A token is required for authentication",
      });
    }
    try {
      const decoded = jwt.verify(token, config);
      console.log(decoded,20);
     
      req.user = decoded;
    } catch (err) {
      return res.status(401).send({ status: 401, message: "Invalid Token" });
    }
    return next();
  } else {
    return res.status(403).send({
      status: 403,
      message: "A token is required for authentication",
    });
  }
};

module.exports = verifyToken;
