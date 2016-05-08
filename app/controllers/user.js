var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.getUser = function(req, res, next) {
    var query = User.find()
        .limit(20)        
        .sort('-createdAt');

    query.exec(function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
}