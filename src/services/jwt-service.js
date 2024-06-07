const jwt = require("jsonwebtoken");

const jwtService = {};

// sign jwt token
jwtService.sign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// verify token
jwtService.verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = jwtService;
