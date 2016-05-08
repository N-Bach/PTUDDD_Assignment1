var mongoose = require('mongoose');
var User = mongoose.model('User');

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

exports.getUser = function(req, res, next) {
    var query = User.find()
        .limit(20)
        .populate('cards')      
        .sort('-createdAt');        

    query.exec(function(err, users) {
        if (err) return next(err);
        res.json(users);
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
    res.send('removed follower & following');
}


