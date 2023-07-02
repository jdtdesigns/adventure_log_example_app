const router = require('express').Router();
const User = require('../models/User');

// Register User
router.post('/register', (clientReq, serverRes) => {
  try {
    const user = User.create(clientReq.body);

    serverRes.redirect(`/dashboard?id=${user.id}`);
  } catch (err) {
    serverRes.redirect('/login');
  }
});


// Login User
router.post('/login', (clientReq, serverRes) => {
  try {
    const user = User.getByUsername(clientReq.body.username);

    if (user.password !== clientReq.body.password) {
      throw new Error('Password does not match.');
    }

    serverRes.redirect(`/dashboard?id=${user.id}`);
  } catch (err) {
    serverRes.redirect('/login');
  }
});

module.exports = router;