var mongoose = require('mongoose');
var Card = mongoose.model('Card');
var User = mongoose.model('User');

exports.postCard = function(req, res, next) {
    var cardInfo = req.body;    
    var newCard = new Card(cardInfo);

    newCard.save(function(err, card) {
        if (err) return next(err);        
        User.findById(cardInfo.created_by, 
                function(err, user) {
            if (err) next(err);
            user.cards.push(card._id);
            user.save(function(err) {
                if (err) next(err);
            });
        });
        res.json(card);
    });
}

// Note: user con upvote his/her own card
exports.putUpvoteCard = function(req, res, next) {
    var userid = req.params.user;
    User.findById(userid, function(err, user) {
        if (err) return next(err);
        
        var index = user.upvoted.indexOf(req.card._id);
        // check if already upvoted the card            
        if (index !== -1) { 
            res.status(400).send("you upvoted already");
        } else {
            user.addUpvotedCard(req.card._id, function(err) {
                if (err) return next(err);
            });
            req.card.upvote(function(err,card) {
                if (err) return next(err);        
                req.card.created_by = userid;
                res.json(req.card);
            });
        }
    });    
}

exports.removeUpvote = function(req, res, next) {
    var userid = req.params.user;
    User.findById(userid, function(err, user) {
        if (err) return next(err);
        var index = user.upvoted.indexOf(req.card._id);
        if (index === -1) {
            res.status(400).send('You haven\'t upvoted this post');
        }
        else {
            user.removeUpvote(index, function(err) {
                if (err) return next(err);                
            });
            req.card.removeUpvote(function(err, card) {
                if (err) return next(err);
                req.card.created_by = userid;
                res.json(card);
            });
        }
    });
}

exports.getCard = function(req, res, next) {
    var query = Card.find()
        .limit(20)        
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
