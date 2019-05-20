const express = require('express');
const router = express.Router();
const models = require('../../models');

/* GET users listing. */
router.get('/users', (req, res, next) => {
    models.user.findAll().then(users => {
        res.send(users);
    });
});

router.post('/user', (req, res, next) => {
    // console.log(req.body);
    models.user.findAll({
        where: {
            token: req.body.uid,
        }
    }).then((result) => {
        // console.log(result.length);
        if (result.length > 0) {
            return res.json({"message": "User is registered"})
        } else {
            models.user.create({
                token: req.body.uid,
                group: req.body.group ? req.body.group : 2,
                displayName: req.body.displayName ? req.body.displayName : null,
                avatarPath: req.body.avatarPath ? req.body.avatarPath : null,
                email: req.body.email ? req.body.email : null
            }).then((result) => res.json(result))
                .catch((err) => res.json(err));
        }
    })
        .catch((err) => res.json(err));



    // models.user.findOrCreate({
    //   where: {
    //     token: req.body.uid,
    //     group: req.body.group ? req.body.group : 2
    //   }
    // }).then( (result) => res.json(result))
    //   .catch((err) => res.json(err));

    // models.sequelize.transaction(function(t) {
    //   return models.user.findOrCreate({
    //     where: {
    //       token: req.body.uid,
    //       group: req.body.group ? req.body.group : 2
    //     },
    //     transaction: t
    //   })
    //     .spread(function(userResult, created){
    //       if (created) {
    //         console.log("been")
    //       }
    //     })
    //     .then((result) => res.json(result));
    // });


});

router.get('/userFromToken/:token', (req, res, next) => {
    let token = req.params.token;
    console.log(token);
    models.user.findAll({
        where: {token: token}
    }).then((users) => {
        res.send(users);
    }).catch((err) => res.json(err));
});

// router.post('/user', (req, res, next) => {
//   models.user.create({
//     token: req.body.uid,
//     group: req.body.group ? req.body.group : 2
//   }).then( (result) => res.json(result))
//     .catch((err) => res.json(err));
// });


module.exports = router;
