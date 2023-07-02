const router = require('express').Router();
const Log = require('../models/Log');

// Create Log
router.post('/log', (clientReq, serverRes) => {
  Log.create(clientReq.body);

  serverRes.send('Log created successfully!');
});

// Get all logs
router.get('/logs', (clientReq, serverRes) => {
  const logs = Log.getAll();

  serverRes.send(logs);
});

// Get logs by user id
router.get('/logs/:user_id', (clientReq, serverRes) => {
  const userLogs = Log.getAllByUserId(clientReq.params.user_id);

  serverRes.send(userLogs);
});

// Get log by id
router.get('/edit/:id', (clientReq, serverRes) => {
  const log = Log.getById(clientReq.params.id);

  serverRes.send(log);
});

// Update log
router.put('/edit', (clientReq, serverRes) => {
  Log.update(clientReq.body);

  serverRes.send('Updated successfully!');
});

// Delete log
router.get('/del/:log_id', (clientReq, serverRes) => {
  Log.delete(clientReq.params.log_id);
  console.log(clientReq.params, clientReq.query);
  serverRes.redirect(`/dashboard?id=${clientReq.query.user_id}`);
})

module.exports = router;