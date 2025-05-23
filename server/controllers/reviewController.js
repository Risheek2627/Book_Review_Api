const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const Book = require("../models/bookModel");
// add review one per book

const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;

    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const existReview = await Review.findOne(
      { user: userId },
      { book: bookId }
    );
    if (existReview) {
      return res
        .status(400)
        .json({ message: "You already reviewed this book." });
    }

    const review = new Review({
      book: bookId,
      user: userId,
      rating: Number(rating),
      comment,
    });

    await review.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addReview, updateReview, deleteReview };
