const { body } = require("express-validator");

const registerValidation = [
  body("username").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const bookEntry = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author name is required"),
  body("genre").notEmpty().withMessage("Genre is required"),
];

module.exports = {
  registerValidation,
  loginValidation,
  bookEntry,
};
