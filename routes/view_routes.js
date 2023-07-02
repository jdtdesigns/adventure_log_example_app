const router = require('express').Router();
const path = require('path');

// Show Login Page
router.get('/login', (clientReq, serverRes) => {
  serverRes.sendFile(path.join(__dirname, '../views/login.html'));
});

// Show Register Page
router.get('/register', (clientReq, serverRes) => {
  serverRes.sendFile(path.join(__dirname, '../views/register.html'));
});

// Show Log Page
router.get('/dashboard', (clientReq, serverRes) => {
  serverRes.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

// Show Adventures Page
router.get('/adventures', (clientReq, serverRes) => {
  serverRes.sendFile(path.join(__dirname, '../views/adventures.html'));
});

// Show Log Edit Form Page
router.get('/edit', (clientReq, serverRes) => {
  serverRes.sendFile(path.join(__dirname, '../views/edit.html'));
});

module.exports = router;