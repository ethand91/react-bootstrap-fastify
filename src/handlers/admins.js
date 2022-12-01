const jwt = require('jsonwebtoken');

const admins = require('./../data/admins');

const getAdminsHandler = (req, res) => {
  res.send(admins);
};

const newAdminHandler = (req, res) => {
  const { email, password } = req.body;
  const id = admins.length + 1;

  admins.push({
    id,
    email,
    password
  });

  res.send('Account created successfully');
};

const loginAdminHandler = async (req, res) => {
  const { email, password } = req.body;

  const admin = admins.filter((admin) => {
    return admin.email === email;
  })[0];

  if (!admin || admin.password !== password) {
    return res.send('Login Failed');
  }

  try {
    jwt.sign(
      { id: admin.id },
      'secrets',
      { expiresIn: 3 * 86400 },
      (error, token) => {
        if (error) {
          return res.status(500).send(new Error(error));
        }

        res.send({ token });
      }
    );

    await res;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAdminsHandler,
  newAdminHandler,
  loginAdminHandler
};
