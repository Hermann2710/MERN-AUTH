require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_KEY, { expiresIn: "7d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken,
};
