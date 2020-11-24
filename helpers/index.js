const User = require('../models/User');
const Book = require('../models/Book');

// Get User By Id
const getUserById = async (id) => {
  try {
    const user = await User.findById(id).lean();
    return { ...user, books: await getBooksByUser(id) };
  } catch (error) {
    throw error;
  }
};

// Get Book By Id
const getBookById = async (id) => {
  try {
    return await Book.findById(id).lean();
  } catch (error) {
    throw error;
  }
};

// Get All Of Books By User
const getBooksByUser = async (id) => {
  try {
    const books = await Book.find({ author: id }).lean();
    return books.length
      ? books.map(async (book) => ({ ...book, author: await getUserById(id) }))
      : [];
  } catch (error) {
    throw error;
  }
};

module.exports = { getBookById, getUserById, getBooksByUser };
