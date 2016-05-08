var mongoose = require('mongoose');
var Card = mongoose.model('Card');

exports.postCard = function(req, res, next) {
    var cardInfo = req.body;    
    var newCard = new Card(cardInfo);   
    newCard.save(function(err, card) {
        if (err) return next(err);        
        res.json(card);
    });
}

exports.putUpvoteCard = function(req, res, next) {    
    req.card.upvote(function(err) {
        if (err) return next(err);
        res.json(req.card);
    });
}

exports.getCard = function(req, res, next) {
    var query = Card.find()
        .limit(10)
        .populate('created_by')
        .sort('-createdAt');

    query.exec(function(err, cards) {
        if (err) return next(err);
        res.json(cards);
    });
}

exports.paramCard = function(req, res, next, id) {
    var query = Card.findById(id).populate('created_by');

    query.exec(function(err, card) {
        if (err) { return next(err); }
        if (!card) { return next(new Error('can\'t find card')); }
        
        req.card = card;
        return next();     
    });
}
