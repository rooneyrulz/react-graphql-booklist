const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

// Helpers
const { getBooksByUser } = require('../helpers');

// Models
const User = require('../models/User');

module.exports = {
  // Create User
  createUser: async (args) => {
    const { email, password } = args.authInput;
    try {
      const isUserExist = await User.findOne({ email }).lean();
      if (isUserExist) return new Error('Email has already been in use!');

      const hashedPWD = await hash(password, 12);
      if (!hashedPWD) return new Error('Something went wrong!');

      const user = await new User({
        email,
        password: hashedPWD,
      }).save();

      const token = sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 360000,
      });
      return {
        token,
        user: { ...user._doc, books: await getBooksByUser(user._id) },
      };
    } catch (error) {
      throw error;
    }
  },

  // Authenticate User
  authenticateUser: async (args, req) => {
    console.group(req.user);
    const { email, password } = args.authInput;
    try {
      const user = await User.findOne({ email }).lean();
      if (!user) return new Error('User not found!');

      const isMatch = await compare(password, user.password);
      if (!isMatch) return new Error('Invalid credentials!');

      const token = sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 360000,
      });
      return { token, user };
    } catch (error) {
      throw error;
    }
  },

  // Get Authenticated User
  getAuthenticatedUser: async (args, req) => {
    const { id } = req.user;
    try {
      const user = await User.findById(id).lean();
      if (!user) return new Error('Access denied, Auth user not found!');
      return { ...user._doc, books: await getBooksByUser(id) };
    } catch (error) {}
  },
};
