const express = require("express");
const routes = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

routes.post("/books/:id/reviews", verifyToken, addReview);

routes.put("/reviews/:id", updateReview);

routes.delete("/reviews/:id", deleteReview);

module.exports = routes;
