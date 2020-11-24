const express = require('express');
const { createServer } = require('http');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const loggerHTTP = require('morgan');
const dotENV = require('dotenv');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

// Models
const Book = require('./models/Book');
const User = require('./models/User');

// Auth Middleware
const isAuth = require('./middleware/is-auth');

// Mongo Connection
const db = require('./config/db');

// Helpers
const { getUserById } = require('./helpers/');

const app = express();
const server = createServer(app);

dotENV.config({ path: './config/config.env' });

// Establish Mongo Connection & Listening to Server
db(server);

if (process.env.NODE_ENV === 'development') app.use(loggerHTTP('dev'));

// Use Auth Middleware
app.use(isAuth);

app.use(
  '/',
  graphqlHTTP({
    schema: buildSchema(`
      type AuthData {
        token: String!
        user: User!
      }

      type User {
        _id: ID!
        email: String!
        date: String!
        books: [Book!]
      }

      type Book {
        _id: ID!
        name: String!
        description: String!
        publishedAt: String!
        author: User!
      }

      input AuthInput {
        email: String!
        password: String!
      }

      input BookInput {
        name: String!
        description: String!
      }

      type RootQuery {
        books: [Book!]!
        book(id: String!): Book!
      }

      type RootMutation {
        createBook(bookInput: BookInput): Book
        createUser(authInput: AuthInput): AuthData
        authenticateUser(authInput: AuthInput): AuthData
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      // Get All Books
      books: async (args) => {
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
          return { token, user };
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
    },
    graphiql: true,
  })
);

module.exports = app;
