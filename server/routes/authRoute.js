const express = require("express");
const routes = express.Router();

const userController = require("../controllers/authController");

routes.post("/signup", userController.signUp);

routes.post("/login", userController.login);

module.exports = routes;
