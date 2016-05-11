var mongoose = require('mongoose');
var User = mongoose.model('User');
var Card = mongoose.model('Card');

exports.updateUser = function(req, res, next) {
    var editedUser = req.body;    
    User.findById(req.params.user, function(err, user) {
        if (err) return next(err);
        user.bio = editedUser.bio;
        user.save(function(err, savedUser) {
            res.json(savedUser);    
        });        
    });
}

exports.getUsers = function(req, res, next) {
    var query = User.find()
        .limit(20)
        .sort('-createdAt');        

    query.exec(function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
}

exports.getUser = function(req, res, next) {
    var query = User.findById(req.params.user)
            .populate('cards');

    query.exec(function(err, user) {
        if (err) return next(err)
        res.json(user);
    });
}

exports.getUserCards = function(req, res, next) {
    Card.find({"created_by": req.params.user}, function(err, cards) {
        if (err) return next(err);
        res.json(cards);
    });
}

exports.addFollower = function(req, res, next) {
    var info = req.body;
    User.findById(info.teacher, function(err, teacher) {
        teacher.followers.push(info.student);
        teacher.save(function(err, newteacher) {
            if (err) next(err);
        });
    });

    User.findById(info.student, function(err, student) {
        student.following.push(info.teacher);
        student.save(function(err) {
            if (err) next(err);
        });
    });
    res.send('added follower & following');
}

exports.removeFollower = function(req, res, next) {
    var info = req.body;
    User.findById(info.teacher, function(err, teacher) {
        var index = teacher.followers.indexOf(info.student);
        if (index > -1 ) {
            teacher.followers.splice(index, 1);
        }
        teacher.save(function(err, newteacher) {
            if (err) next(err);
        });
    });

    User.findById(info.student, function(err, student) {
        var index = student.following.indexOf(info.teacher);
        if (index > -1 ) {
            student.following.splice(index, 1);
         }
        student.save(function(err) {
            if (err) next(err);
        });
    });
    res.send('removed follower & following');
}


