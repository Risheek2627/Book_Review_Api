const express = require("express");
const routes = express.Router();
const handleValidationError = require("../validate/handelValidation");
const { bookEntry } = require("../validate/validate");
const verifyToken = require("../middleware/authMiddleware");
const {
  addBook,
  getAllBooks,
  getBookById,
  search,
} = require("../controllers/bookController");

// add book
routes.post("/books", bookEntry, handleValidationError, verifyToken, addBook);

routes.get("/books", getAllBooks);

routes.get("/books/:id", getBookById);

routes.get("/search", search);
module.exports = routes;
