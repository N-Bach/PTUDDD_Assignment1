var express = require('express');
var app = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Card = mongoose.model('Card');

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

app.put('/users/:user/update', function(req, res, next) {
    var editedUser = req.body;    
    User.findById(req.params.user, function(err, user) {
        if (err) return next(err);
        user.bio = editedUser.bio;
        user.save(function(err, savedUser) {
            res.json(savedUser);    
        });        
    });
});

app.param('card', function(req, res, next, id) {
    var query = Card.findById(id).populate('create_by');

    query.exec(function(err, card) {
        if (err) { return next(err); }
        if (!card) { return next(new Error('can\'t find card')); }
        
        req.card = card;
        return next();     
    });
});

app.post('/cards', function(req, res, next) {
    var cardInfo = req.body;    
    var newCard = new Card(cardInfo);   
    newCard.save(function(err, card) {
        if (err) return next(err);        
        res.json(card);
    });
});

app.put('/cards/:card/upvote', function(req, res, next) {    
    req.card.upvote(function(err) {
        if (err) return next(err);
        res.json(req.card);
    });
});

app.get('/cards', function(req, res, next) {
    var query = Card.find()
        .limit(10)
        .populate('create_by')
        .sort('-createdAt');

    query.exec(function(err, cards) {
        if (err) return next(err);
        res.json(cards);
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.send('Your shall not pass');
};

module.exports = app;