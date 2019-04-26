const express = require('express');
const router = express.Router();
const models = require('../../models');

router.get('/playlist', (req, res, next) => {
  models.playlist.findAll().then(playlists => {
    res.send(playlists);
  });
});

router.get('/playlist/:userId', (req, res, next) => {
  let id = req.params.userId;
  // console.log("AAA");
  models.playlist.findAll({
    where: {
      belong_to_user: id,
    }
  }).then(tracks => {
    res.send(tracks);
  }).catch((err) => res.json(err));
});

router.post('/playlist', (req, res, next) => {
  models.playlist.create({
    name: req.body.name,
    tracks: req.body.tracks,
    belong_to_user: req.body.user
  })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
});

router.delete('/playlist', (req, res, next) => {
  let id = req.body.id;
  models.playlist.destroy({
    where: {id: id}
  }).then(() => {
    let result = {
      "code": "success",
      "message": `Deleted successfully a playlist with id = ${id}`
    };
    res.status(200).send(result);
  }).catch((err) => res.json(err));
});

router.post('/addToPlaylist', (req, res, next) => {
  let id = req.body.playlist_id;
  let track = req.body.track;
  let old_tracks = "";
  models.playlist.findOne({
    where: {id: id}
  }).then(playlists => {
    old_tracks = playlists.tracks;
    // res.send(playlists.tracks);
    models.playlist.update({
      tracks: old_tracks + track
    },{
      where: {id: id}
    }).then((res) => {
      res.send(res);
    }).catch((err) => res.json(err));
  });

  // models.playlist.update({
  //   tracks: old_tracks + track
  // },{
  //   where: {id: id}
  // }).then(() => {
  //
  // }).catch((err) => res.json(err));


});

module.exports = router;
