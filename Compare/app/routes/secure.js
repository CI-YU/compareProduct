var User = require('../models/user').User;
var Token = require('../models/user').Token;

module.exports = function (router, passport) {

    var auth = function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    };

    router.get('/profile', auth, function (req, res) {
        User.findOne({
            _id: req.user._id
        }).populate('token').exec(function (err, user) {
            res.render('profile.ejs', {
                user: user
            })
        });
    });

    router.get('/', function (req, res) {
        res.render('index.html');
    });

    router.get('/user', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : false);
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));

    router.post('/signup', passport.authenticate('local-signup'), function (req, res) {
        res.send(req.user);
    });

    router.get('/logout', function (req, res) {
        console.log("logout");
        req.logout();
        res.redirect('/');
    });

    router.get('/getToken', function (req, res) {
        User.findOne({
            _id: req.user._id
        }).populate('token').exec(function (err, user) {
            if (user.token == null) {
                user.generateToken();
            }
            req.user = user;
            res.redirect('/profile');
        });
    });

    router.get('/*', function (req, res) {
        res.redirect('/');
    });
}