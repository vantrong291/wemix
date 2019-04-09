const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const favTrackRouter = require('./favouriteTrack');
const playlistRouter = require('./playlist');

router.use('/', userRouter);
router.use('/', favTrackRouter);
router.use('/', playlistRouter);

module.exports = router;

