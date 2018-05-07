var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('../app/models/user').User;
var Token = require('../app/models/user').Token;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        process.nextTick(function () {
            User.findOne({
                'username': username
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email already taken'));
                } else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            })
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        process.nextTick(function () {
            User.findOne({
                'username': username
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No User Found'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'invaild password'));
                }
                return done(null, user);
            })
        });
    }));

    passport.use(new BearerStrategy({}, function (token, done) {
        Token.findOne({
            value: token
        }).populate('user').exec(function (err, token) {
            if (!token) {
                return done(null, false);
            }
            return done(null, token.user);
        });
    }));
}