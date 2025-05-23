const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "Token is required" });
  }
  try {
    const decode = jwt.verify(token, process.env.jwt_secret);
    const user = await User.findById(decode.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = verifyToken;
