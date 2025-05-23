const express = require("express");
const routes = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  addBook,
  getAllBooks,
  getBookById,
  search,
} = require("../controllers/bookController");

// add book
routes.post("/books", verifyToken, addBook);

routes.get("/books", getAllBooks);

routes.get("/books/:id", getBookById);

module.exports = routes;
