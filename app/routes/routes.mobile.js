var express = require('express');
var app = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Card = mongoose.model('Card');

var ctrlFeedBack = require('../controllers/feedback');
var ctrlCard = require('../controllers/card');
var ctrlUser = require('../controllers/user');

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

                newUser.save(function(err, saveduser) {
                    if (err)
                       throw err;
                     res.json(saveduser);
                });
            }

        })
});

app.get('/logout', function(req, res, next) {
    req.logout();
    res.status(200).send('Log Out Successfully');
});

app.get('/users', ctrlUser.getUsers);
app.get('/users/:user', ctrlUser.getUser);
app.get('/users/:user/cards', ctrlUser.getUserCards);
app.put('/users/:user/update', ctrlUser.updateUser);
app.put('/users/addFollower', ctrlUser.addFollower);
app.put('/users/removeFollower', ctrlUser.removeFollower);
app.post('/users/review', ctrlUser.postReview);
app.post('/users/pairup', ctrlUser.postPairUp);
app.get('/users/:user/notification', ctrlUser.getNotification);
app.put('/users/:notification', ctrlUser.putNotification);

//app.param('card', isLoggedIn, ctrlCard.paramCard);
app.param('card', ctrlCard.paramCard);
app.post('/cards', ctrlCard.postCard);
app.put('/cards/:card/:user/upvote', ctrlCard.putUpvoteCard);
app.put('/cards/:card/:user/removeupvote', ctrlCard.removeUpvote);
app.get('/cards', ctrlCard.getCard);

app.get('/feedbacks', ctrlFeedBack.getFeedBack);
app.post('/feedbacks', ctrlFeedBack.postFeedBack);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.send('Your shall not pass');
};

module.exports = app;