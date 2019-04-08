var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Express', dashboardClass: "active", iconClass: "", usersClass: "", userClass: "", notificationsClass: "" });
});

router.get('/icons', function(req, res, next) {
  res.render('icons', { title: 'Express', iconClass: "active", dashboardClass: "", usersClass: "", userClass: "", notificationsClass: ""  });
});

router.get('/users', function(req, res, next) {
  res.render('tables', { title: 'Express', usersClass: "active", dashboardClass: "", iconClass: "", userClass: "", notificationsClass: ""  });
});

router.get('/user', function(req, res, next) {
  res.render('user', { title: 'Express', userClass: "active", dashboardClass: "", iconClass: "", usersClass: "", notificationsClass: ""   });
});

router.get('/notifications', function(req, res, next) {
  res.render('notifications', { title: 'Express', notificationsClass: "active", dashboardClass: "", iconClass: "", usersClass: "", userClass: ""});
});

module.exports = router;
