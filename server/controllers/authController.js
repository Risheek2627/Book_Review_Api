const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already registered" });

    const user = new User({ username, email, password });
    await user.save();

    return res.status(200).json({ message: "User added succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log("Stored password ", user.password);
    console.log("Raw password", password);
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    console.log("Is match", isMatch);
    if (!isMatch)
      return res.status(400).json({ message: "Password is incorrect" });

    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successfull", token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signUp, login };
