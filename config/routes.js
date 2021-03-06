const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');
const jwtKey = require('../_secrets/keys').jwtKey;
const jwt = require('jsonwebtoken');
const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1h",
    jwtid: "12345"
  };
  return jwt.sign(payload, jwtKey, options);
}

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 3);

  creds.password = hash;

  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(200).json({ id: user.id, token });
        })
        .catch(err => {
          console.log("Error: ", err);
          res.status(500).json({ Error: "No Users" });
        });
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "No Users Could Be Posted" });
    });
}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ id: user.id, token });
      } else {
        res.status(401).json({ Error: "Cannot Authorize" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Login Failed" });
    });
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}