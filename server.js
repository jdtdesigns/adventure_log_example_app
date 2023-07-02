const express = require('express');

const app = express();
const view_routes = require('./routes/view_routes');
const auth_routes = require('./routes/auth_routes');
const log_routes = require('./routes/log_routes');
const PORT = process.env.PORT || 3333;

// Middleware
app.use(express.static('public'));
// Open channel to allow standard form submition data
app.use(express.urlencoded({ extended: false }));
// Open channel to allow json data
app.use(express.json());

// Routes
app.use('/', [
  view_routes,
  auth_routes,
  log_routes
]);

// Start Server
app.listen(PORT, () => console.log('Server running on port %s', PORT));