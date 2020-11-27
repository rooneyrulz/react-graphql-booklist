const Book = require('../models/Book');
const { getUserById } = require('../helpers');

module.exports = {
  // Get All Books
  books: async () => {
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
  book: async (args) => {
    const { id } = args;
    try {
      const book = await Book.findById(id).lean();
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
};
