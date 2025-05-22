const { body } = require("express-validator");

const registerValidation = [
  body("username").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),
];

const loginValidation = [
  bodybody("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registerValidation, loginValidation };
