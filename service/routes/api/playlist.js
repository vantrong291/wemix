const express = require('express');
const router = express.Router();
const models = require('../../models');

router.get('/playlist', (req, res, next) => {
  models.playlist.findAll().then(playlists => {
    res.send(playlists);
  });
});

module.exports = router;
