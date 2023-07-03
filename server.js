const express = require('express');

const app = express();
const PORT = process.env.PORT || 3333;
const view_routes = require('./routes/view_routes');
const auth_routes = require('./routes/auth_routes');
const adventure_routes = require('./routes/adventure_routes');

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/', [
  view_routes,
  auth_routes,
]);
app.use('/api', adventure_routes);

// Start the server
app.listen(PORT, () => console.log('Server started on port %s', PORT));