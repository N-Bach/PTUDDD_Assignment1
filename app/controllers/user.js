var mongoose = require('mongoose');
var User = mongoose.model('User');
var Card = mongoose.model('Card');
var Review = mongoose.model('Review');
var Notification = mongoose.model('Notification');

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
        //.limit(20)
        .sort('-createdAt');        

    query.exec(function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
}

exports.getUser = function(req, res, next) {
    var query = User.findById(req.params.user);
            //.populate('cards');

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
        // check if already a follower
        if (!checkExist(info.student, teacher.followers)) {
            teacher.addFollower(info.student, function(err) {
                if (err) return next(err);
                User.findById(info.student, function(err, student) {
                    // check if already following
                    if (!checkExist(info.teacher, student.following)) {
                        student.addFollowing(info.teacher, function(err) {
                            if (err) return next(err);
                            res.send('added following & followers');
                        });
                    }
                    else { // already following
                        res.status(400).send('already following');
                    }
                });
            });
        }
        else { // already a follower
            res.status(400).send('already a followers');
        }
    });

}

exports.removeFollower = function(req, res, next) {
    var info = req.body;
    User.findById(info.teacher, function(err, teacher) {
        var index = teacher.followers.indexOf(info.student);
        if (index > -1 ) {
            teacher.followers.splice(index, 1);
            teacher.save(function(err, newteacher) {
                if (err) next(err);
                User.findById(info.student, function(err, student) {
                    var index = student.following.indexOf(info.teacher);
                    if (index > -1 ) {
                        student.following.splice(index, 1);
                        student.save(function(err) {
                            if (err) next(err);
                            res.send('removed follower & following');
                        });
                     }
                     else {
                        res.status(400).send('user doens\'t exist in following list');
                    }
                });
            });
        }
        else {
            res.status(400).send('user doens\'t exist in follower list');
        }
    });
}

exports.postReview = function(req, res, next) {
    var newreview = new Review(req.body);
    
    newreview.save(function(err, review) {
        if (err) return next(err);
        // add new review to list of reviews in card
        Card.findById(review.for_card, function(err, card) {
            if (err) return next(err);
            if (card.created_by.toString() === review.created_by.toString()) {
                res.send('You canno\'t review your own course');
            }
            else {
                card.addReview(review, function(err, newcard) {
                    if (err) return next(err);
                    // add new review to list of reviews in user
                    User.findById(review.created_by, function(err, user) {
                        if (err) return next(err);
                        user.addReview(review._id,function(err) {
                            if (err) return next(err);
                        });        
                    });
                    res.json(newcard);
                });
            }
        });
    });
}

exports.postPairUp = function(req, res, next) {
    var noti = new Notification(req.body);        
    // add student to student list in cards 
    Card.findById(noti.for_card, function(err, card) {
        if (err) return next(err);        
        if (checkExist(noti.created_by, card.students)) {
            res.status(400).send('You\'re already a student');
            return next();
        }
        else {
            card.addStudent(noti.created_by,function(err) {
                if (err) return next(err);
            });            
        }
    });
    // add new student to teacher user
    User.findById(noti.to, function(err, user) {
        if (err) return next(err);
        if (!checkExist(noti.created_by, user.students)) {
            user.addStudent(noti.created_by, function(err) {
                if (err) return next(err);
            });
        } else {return;}
    });
    // add new teacher to student user
    User.findById(noti.created_by, function(err, user) {
        if (err) return next(err);
        if (!checkExist(noti.to, user.teachers)) {
            user.addTeacher(noti.to, function(err) {
                if (err) return next(err);
            });
        } else {return;}
    });
    // create new notification
    noti.save(function(err, notification) {
        if (err) return next(err);
        res.json(notification);
    });
}

exports.getNotification = function(req, res, next) {
    Notification.find({"to": req.params.user, 
        "status": 0}, function(err, notis) {
            res.json(notis);
    });

    // change noti status to 1 after 3 sec waiting
    /*setTimeout(function() {                
        Notification.update({"to": req.params.user, 
            "status": 0}, {"status": 1}, {multi: true},
            function(err, diff) {
                if (err) return next(err);
        });
    },3000);*/
}

exports.putNotification = function(req, res, next) {
    Notification.findById(req.params.notification, function(err, noti) {
        if (err) return next(err);
        noti.updateStatus(function(err) {
            if (err) return next(err);
        });
    });
} 

// if exist in list return true
// else return false
var checkExist = function(item, list) {
    var index = list.indexOf(item);
    return (index !== -1) ? true : false;
}
