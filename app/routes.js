var express = require('express');
var app = express.Router();
var passport = require('passport');

var User = require('./models/user');

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/login', function(req, res) {
    res.render('login.ejs', {message: req.flash('loginMessage')} );
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

app.get('/profile', isLoggedIn, function(req, res) {       
    res.render('profile.ejs', {
        user: req.user
    });
});

app.get('/profile/current', isLoggedIn, function(req, res) {
    res.json(req.user);
});

app.put('/profile/current', isLoggedIn, function(req, res, next) {
        
    var updateUser = req.body;

    User.findById(updateUser._id, function(err, user) {
        if (err) return next(err);        

        user.bio.firstName = updateUser.bio.firstName;
        user.bio.lastName = updateUser.bio.lastName;
        user.bio.age = updateUser.bio.age;
        user.bio.phoneNumber = updateUser.bio.phoneNumber;
        user.bio.university = updateUser.bio.university;

        user.save(function(err, newuser) {
            if (err) return next(err);
            res.json(newuser);
        });
    });

});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
};

module.exports = app;