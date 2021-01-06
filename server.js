const express = require('express');
const { createServer } = require('http');
const { graphqlHTTP } = require('express-graphql');
const loggerHTTP = require('morgan');
const dotENV = require('dotenv');
const path = require('path');

// Schemas & Resolvers
const schema = require('./schemas/');
const resolver = require('./resolvers/');

// Auth Middleware
const isAuth = require('./middleware/is-auth');

// Mongo Connection
const db = require('./config/db');

const app = express();
const server = createServer(app);

dotENV.config({ path: '.env' });

if (process.env.NODE_ENV === 'production') console.log = function() {};

if (process.env.NODE_ENV === 'development') app.use(loggerHTTP('dev'));

// Establish Mongo Connection & Listening to Server
db(server);

app.use(express.static(path.join(__dirname, './client/build')));

// Use Auth Middleware
app.use(isAuth);

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Access, Authorization, x-auth-token'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build'));
});

module.exports = app;
