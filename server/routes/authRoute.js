const express = require("express");
const routes = express.Router();
const handleValidationError = require("../validate/handelValidation");
const { registerValidation, loginValidation } = require("../validate/validate");

const userController = require("../controllers/authController");

routes.post(
  "/signup",
  registerValidation,
  handleValidationError,
  userController.signUp
);

routes.post(
  "/login",
  loginValidation,
  handleValidationError,
  userController.login
);

module.exports = routes;
