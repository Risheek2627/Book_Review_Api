const express = require("express");
const routes = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

routes.post("/books/:id/reviews", verifyToken, addReview); // Book Id

routes.put("/reviews/:id", verifyToken, updateReview);

routes.delete("/reviews/:id", verifyToken, deleteReview);

module.exports = routes;
