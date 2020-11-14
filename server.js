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

// Mongo Connection
const db = require('./config/db');

const app = express();
const server = createServer(app);

dotENV.config({ path: './config/config.env' });

// Establish Mongo Connection & Listening to Server
db(server);

if (process.env.NODE_ENV === 'development') app.use(loggerHTTP('dev'));

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
      }

      type Book {
        _id: ID!
        name: String!
        description: String!
        publishedAt: String!
        author: String
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
      books: async () => {
        try {
          const books = await Book.find().lean();
          return books;
        } catch (error) {
          console.log(error.message);
        }
      },

      // Get Book By Id
      book: async (args) => {
        const { id } = args;
        try {
          const book = await Book.findById(id).lean();
          return book;
        } catch (error) {
          console.log(error.message);
        }
      },

      // Create Book
      createBook: async (args) => {
        const { name, description } = args.bookInput;
        try {
          const book = await new Book({
            name,
            description,
            author: null,
          }).save();
          return book;
        } catch (error) {
          console.log(error.message);
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
          console.log(error.message);
        }
      },

      // Authenticate User
      authenticateUser: async (args) => {
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
          console.log(error.message);
        }
      },
    },
    graphiql: true,
  })
);

module.exports = app;
