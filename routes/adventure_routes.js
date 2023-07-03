const router = require('express').Router();
const Adventure = require('../models/Adventure');

// Create an Adventure
// http://localhost:3333/api/adventure
router.post('/adventure', (clientReq, serverRes) => {
  try {
    Adventure.create(clientReq.body);

    serverRes.send('Adventure added successfully!');
  } catch (err) {
    if (err.message === 'empty_data') {
      serverRes.redirect('/dashboard');
    }
  }
});

// Get Adventures for User
router.get('/adventures/:user_id', (clientReq, serverRes) => {
  try {
    const adventures = Adventure.getByUserId(clientReq.params.user_id);

    serverRes.send(adventures);
  } catch (err) {
    console.log(err);
  }

});

// Get All Adventures
router.get('/adventures', (clientReq, serverRes) => {
  const adventures = Adventure.getAll();
  serverRes.send(adventures);
});

// Get Adventure By ID
router.get('/adventure/:adventure_id', (clientReq, serverRes) => {
  const adventure = Adventure.getById(clientReq.params.adventure_id);

  serverRes.send(adventure);
});

// Edit an Adventure
router.put('/adventure/:adventure_id', (clientReq, serverRes) => {
  Adventure.update(clientReq.params.adventure_id, clientReq.body);

  serverRes.send('Updated successfully!');
});

// Delete an Adventure
router.delete('/adventure/:adventure_id', (clientReq, serverRes) => {
  Adventure.deleteAdventure(clientReq.params.adventure_id);

  serverRes.send('Deleted successfully!');
});

module.exports = router;