const Book = require("../models/bookModel");

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
