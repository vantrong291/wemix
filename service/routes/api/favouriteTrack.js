const express = require('express');
const router = express.Router();
const models = require('../../models');

router.get('/favouriteTrack', (req, res, next) => {
    models.favourite_track.findAll().then(tracks => {
        res.send(tracks);
    });
});

router.get('/favouriteTrack/:userId', (req, res, next) => {
    let id = req.params.userId;
    // console.log("AAA");
    models.favourite_track.findAll({
        where: {
            belong_to_user: id,
        }
    }).then(tracks => {
        res.send(tracks);
    }).catch((err) => res.json(err));
});


router.post('/favouriteTrack', (req, res, next) => {
    models.favourite_track.create({
        track: req.body.track,
        belong_to_user: req.body.user
    })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

router.delete('/favouriteTrack', (req, res, next) => {
    let id = req.body.id;
    models.favourite_track.destroy({
        where: {id: id}
    }).then(() => {
        let result = {
            "code": "success",
            "message": `Deleted successfully a favourite Track with id = ${id}`
        };
        res.status(200).send(result);
    }).catch((err) => res.json(err));
});

module.exports = router;
