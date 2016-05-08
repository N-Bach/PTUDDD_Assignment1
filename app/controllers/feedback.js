var mongoose = require('mongoose');
var FeedBack = mongoose.model('FeedBack');

exports.postFeedBack = function(req, res, next) {
    var newFeedBack = new FeedBack(req.body);
    newFeedBack.save(function(err) {
        if (err) throw err;
        res.json(newFeedBack);
    });
}

exports.getFeedBack = function(req, res, next) {
    var query = FeedBack.find()
        .limit(10)
        .populate('created_by')
        .sort('-createdAt');

    query.exec(function(err, feedbacks) {
        if (err) return next(err);
        res.json(feedbacks);
    });
}