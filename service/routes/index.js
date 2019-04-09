const express = require('express');
const router = express.Router();

const uiRouter = require('./ui');
const apiRouter = require('./api');

router.use('/', uiRouter);
router.use('/api/v1', apiRouter);

module.exports = router;

