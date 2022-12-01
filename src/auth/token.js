const jwt = require('jsonwebtoken');

const verifyToken = (req, res, done) => {
  const { token } = request.headers;

  jwt.verify(token, 'secrets', (error, decoded) => {
    if (error) {
      done(new Error('Unauthorized'));
    }

    req.user = {
      id: decoded.id
    };
  });

  done();
};

module.exports = { verifyToken };
