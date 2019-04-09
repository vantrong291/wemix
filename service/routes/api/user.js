const express = require('express');
const router = express.Router();
const models = require('../../models');

/* GET users listing. */
router.get('/users', (req, res, next) => {
  // res.send('respond with a resource');
  models.user.findAll().then(users => {
    // Send all customers to Client
    res.send(users);
  });
});

module.exports = router;
