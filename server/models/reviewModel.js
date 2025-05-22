const mongoose = require("mongoose");
const { useDeferredValue } = require("react");

const reviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Book,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: useDeferredValue,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: String,
});

// Unique: one review per user per book
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
