const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

const signToken = (payload) => {
  return jwt.sign(payload, JWT_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_KEY);
};

module.exports = { signToken, verifyToken };
