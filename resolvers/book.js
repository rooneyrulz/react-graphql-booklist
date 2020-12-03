const Book = require('../models/Book');
const User = require('../models/User');

const { getUserById } = require('../helpers');

module.exports = {
  // Get All Books
  books: async (args, req) => {
    if (!req.isAuth) return new Error('Authorization failed!');

    try {
      const books = await Book.find().lean();
      return books.length
        ? books.map(async (book) => ({
            ...book,
            author: await getUserById(book.author),
          }))
        : [];
    } catch (error) {
      throw error;
    }
  },

  // Get Book By Id
  book: async (args, req) => {
    if (!req.isAuth) return new Error('Authorization failed!');

    const { id } = args;
    try {
      const book = await Book.findById(id).lean();
      if (!book) throw new Error('Book with the id not found!');

      return { ...book, author: await getUserById(book.author) };
    } catch (error) {
      throw error;
    }
  },

  // Create Book
  createBook: async (args, req) => {
    if (!req.isAuth) return new Error('Authorization failed!');

    const { id } = req.user;
    const { name, description } = args.bookInput;

    try {
      const user = await User.findById(id).lean();
      if (!user) return new Error('Auth user not found, Access denied!');

      const book = await new Book({
        name,
        description,
        author: id,
      }).save();
      return { ...book._doc, author: await getUserById(id) };
    } catch (error) {
      throw error;
    }
  },

  // Update Book
  updateBook: async (args, req) => {
    if (!req.isAuth) return new Error('Authorization failed!');

    const {
      id,
      bookInput: { name, description },
    } = args;

    try {
      const user = await User.findById(req.user.id).lean();
      if (!user) return new Error('Auth user not found, Access denied!');

      const book = await Book.findById(id).lean();
      if (!book) return new Error('Book not found!');

      if (book.author.toString() !== user._id.toString())
        return new Error('Access denied, Forbidden');

      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { name, description, author: req.user.id },
        { new: true }
      ).lean();

      return {
        ...updatedBook,
        author: await getUserById(updatedBook.author),
      };
    } catch (error) {
      throw error;
    }
  },

  // Remove Book
  removeBook: async (args, req) => {
    if (!req.isAuth) return new Error('Authorization failed!');

    const { id } = args;

    try {
      const user = await User.findById(req.user.id).lean();
      if (!user) return new Error('Access denied, Auth user not found!');

      const book = await Book.findById(id).lean();
      if (!book) return new Error('Book not found!');

      if (book.author.toString() !== user._id.toString())
        return new Error('Access denied, Forbidden');

      await Book.findByIdAndDelete(book._id).exec();

      return `Book with id ${book._id} has been successfully removed!`;
    } catch (error) {
      throw error;
    }
  },
};
