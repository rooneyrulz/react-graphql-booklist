const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('x-auth-token')
    ? req.get('x-auth-token').split(' ')[1]
    : null;

  if (token) {
    req.isAuth = false;
    return next();
  }

  let decodedToken;

  try {
    decodedToken = verify(token, process.env.JWT_SECRET);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.user = decodedToken.id;
  next();
};
