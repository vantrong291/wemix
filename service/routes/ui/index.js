const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Tổng quan | Quản lý Wemix Music', dashboardClass: "active", iconClass: "", usersClass: "", userClass: "", notificationsClass: "" });
});

router.get('/icons', function(req, res, next) {
  res.render('icons', { title: 'Icon | Quản lý Wemix Music', iconClass: "active", dashboardClass: "", usersClass: "", userClass: "", notificationsClass: ""  });
});

router.get('/users', function(req, res, next) {
  res.render('tables', { title: 'Danh sách User | Quản lý Wemix Music', usersClass: "active", dashboardClass: "", iconClass: "", userClass: "", notificationsClass: ""  });
});

router.get('/user', function(req, res, next) {
  res.render('user', { title: 'User | Quản lý Wemix Music', userClass: "active", dashboardClass: "", iconClass: "", usersClass: "", notificationsClass: ""   });
});

router.get('/notifications', function(req, res, next) {
  res.render('notifications', { title: 'Thông báo | Quản lý Wemix Music', notificationsClass: "active", dashboardClass: "", iconClass: "", usersClass: "", userClass: ""});
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
