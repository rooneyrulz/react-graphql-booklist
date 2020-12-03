const express = require('express');
const { createServer } = require('http');
const { graphqlHTTP } = require('express-graphql');
const loggerHTTP = require('morgan');
const dotENV = require('dotenv');

// Schemas & Resolvers
const schema = require('./schemas/');
const resolver = require('./resolvers/');

// Auth Middleware
const isAuth = require('./middleware/is-auth');

// Mongo Connection
const db = require('./config/db');

const app = express();
const server = createServer(app);

dotENV.config({ path: './config/config.env' });

if (process.env.NODE_ENV === 'production') console.log = function() {};

if (process.env.NODE_ENV === 'development') app.use(loggerHTTP('dev'));

// Establish Mongo Connection & Listening to Server
db(server);

// Use Auth Middleware
app.use(isAuth);

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

module.exports = app;
