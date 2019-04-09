const express = require('express');
const router = express.Router();
const models = require('../../models');

router.get('/favouriteTrack', (req, res, next) => {
  models.favourite_track.findAll().then(tracks => {
    res.send(tracks);
  });
});

module.exports = router;
