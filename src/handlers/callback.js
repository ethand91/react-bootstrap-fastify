const jwt = require('jsonwebtoken');

const admins = require('./../data/admins');

const getCallbackHandler = async (req, res) => {
  const id = admins.length + 1;
  const { state } = req.params;

  admins.push({
    id,
    email: state + `@line.com`,
    password: undefined
  });

  try {
    jwt.sign(
      { id },
      'secrets',
      { expiresIn: 3 * 86400 },
      (error, token) => {
        if (error) {
          return res.status(500).send(new Error(error));
        }

        res.redirect('https://f2d1-119-229-104-166.jp.ngrok.io/posts?token=' + token);
      }
    );

    await res;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getCallbackHandler
};
