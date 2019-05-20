const express = require('express');
const router = express.Router();
const models = require('../../models');


/* GET home page. */
router.get('/', async function (req, res, next) {

    let numberOfFavTracks = 0;
    let numberOfUsers = 0;
    let numberOfPlaylist = 0;
    let numberOfAdmin = 0;
    let numberOfNormalUser = 0;


    await models.favourite_track.count({
        distinct: false
    }).then(numberOfTracks => {
        numberOfFavTracks = numberOfTracks;
        console.log(numberOfTracks);
    }).catch((err) => res.json(err));

    await models.user.count({
        distinct: false
    }).then(userCount => {
        numberOfUsers = userCount;
        console.log(numberOfUsers);
    }).catch((err) => res.json(err));

    await models.playlist.count({
        distinct: false
    }).then(playlistCount => {
        numberOfPlaylist = playlistCount;
        console.log(numberOfPlaylist);
    }).catch((err) => res.json(err));

    await models.user.count({
        distinct: false,
        where: {
            group: 1
        }
    }).then(adminCount => {
        numberOfAdmin = adminCount;
        console.log(numberOfAdmin);
    }).catch((err) => res.json(err));

    numberOfNormalUser = numberOfUsers - numberOfAdmin;

    res.render('dashboard', {
        title: 'Tổng quan | Quản lý Wemix Music',
        dashboardClass: "active",
        iconClass: "",
        usersClass: "",
        userClass: "",
        notificationsClass: "",
        numberOfUsers: numberOfUsers,
        numberOfAdmin: numberOfAdmin,
        numberOfNormalUser: numberOfNormalUser,
        numberOfPlaylist: numberOfPlaylist,
        numberOfFavTracks: numberOfFavTracks
    });
});

router.get('/icons', function (req, res, next) {
    res.render('icons', {
        title: 'Icon | Quản lý Wemix Music',
        iconClass: "active",
        dashboardClass: "",
        usersClass: "",
        userClass: "",
        notificationsClass: ""
    });
});

router.get('/users', function (req, res, next) {
    res.render('tables', {
        title: 'Danh sách User | Quản lý Wemix Music',
        usersClass: "active",
        dashboardClass: "",
        iconClass: "",
        userClass: "",
        notificationsClass: ""
    });
});

router.get('/user', function (req, res, next) {
    res.render('user', {
        title: 'User | Quản lý Wemix Music',
        userClass: "active",
        dashboardClass: "",
        iconClass: "",
        usersClass: "",
        notificationsClass: ""
    });
});

router.get('/notifications', function (req, res, next) {
    res.render('notifications', {
        title: 'Thông báo | Quản lý Wemix Music',
        notificationsClass: "active",
        dashboardClass: "",
        iconClass: "",
        usersClass: "",
        userClass: ""
    });
});

router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express'});
});

module.exports = router;
