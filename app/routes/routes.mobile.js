var express = require('express');
var app = express.Router();
var passport = require('passport');
var User = require('../models/user');

app.post('/login', passport.authenticate('local-login'), function(req, res, next) {
    res.json(req.user);
});

app.post('/signup', function(req, res, next) {
    var signupUser = req.body;
    User.findOne({ 'local.email': signupUser.email }, function(err, user) {
            if (err) 
                return next(err);
            if (user) {
                 res.status(500).send('Email already Exist');
            } else {
                var newUser = new User();

                newUser.local.email = signupUser.email;
                newUser.local.password = newUser.generateHash(signupUser.password);

                newUser.save(function(err) {
                    if (err)
                       throw err;
                     res.status(200).send('Sign up Successfully');
                });
            }

        })
});

app.get('/logout', function(req, res, next) {
    req.logout();
    res.status(200).send('Log Out Successfully');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
};

module.exports = app;