const router = require('express').Router();
const User = require('../models/User');

// Register User
router.post('/register', (clientReq, serverRes) => {
  try {
    const user = User.create(clientReq.body);

    serverRes.send({
      id: user.id,
      username: user.username
    });

  } catch (err) {
    if (err.message === 'user_exists') {
      serverRes.send({
        error: '402',
        message: 'Username already exists.'
      });
    }

    if (err.message === 'empty_creds') {
      serverRes.send({
        error: '401',
        message: 'You must enter a username and password.'
      });
    }
  }
});

// Login User
router.post('/login', (clientReq, serverRes) => {
  try {
    const user = User.getUserByUsername(clientReq.body.username);

    if (clientReq.body.password !== user.password) throw new Error('password');

    serverRes.send({
      id: user.id,
      username: user.username
    });

  } catch (err) {
    if (err.message === 'not_found') {
      serverRes.send({
        error: '404',
        message: 'User not found with that username.'
      });
    }

    if (err.message === 'password') {
      serverRes.send({
        error: '401',
        message: 'Password is invalid.'
      });
    }
  }
});

module.exports = router;