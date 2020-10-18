const express = require('express');
const { createServer } = require('http');
require('colors');

const app = express();
const server = createServer(app);

server.listen(process.env.PORT | 5000, () =>
  console.log(
    `server running on ${process.env.NODE_ENV} mode on port ${process.env.PORT |
      5000}!!`.black.bgWhite
  )
);
