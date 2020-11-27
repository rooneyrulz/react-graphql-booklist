const authResolver = require('./auth');
const bookResolver = require('./book');

module.exports = { ...authResolver, ...bookResolver };
