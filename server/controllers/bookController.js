const Book = require("../models/bookModel");
const Review = require("../models/reviewModel");

// add new book
const addBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;

    const existBook = await Book.findOne({ title });
    if (existBook)
      return res
        .status(400)
        .json({ message: `The book  ${title} is already added` });

    const book = new Book({
      title,
      author,
      genre,
      publishedYear,
    });

    await book.save();

    return res.status(200).json({ message: "Book added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// get book with pagination and filter of (author or genre)
const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 5, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, "i");
    if (genre) filter.genre = new RegExp(genre, "i");

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get books by id and average rating including pagination

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 3 } = req.query;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const reviews = await Review.find({ book: id })
      .populate("user", "username")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const avgResult = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);

    const averageRating = avgResult[0]?.avgRating || 0;

    console.log("Average_Rating : ", averageRating);
    res.json({ book, Average_Rating: averageRating.toFixed(2), reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const search = async (req, res) => {
  try {
    const { q } = req.query;

    const regex = new RegExp(q, "i");

    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addBook, getAllBooks, getBookById, search };
