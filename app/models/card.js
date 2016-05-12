var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoryType = 'English Japanese German Chinese French Finland Vietnamese Spanish'.split(' ');

var cardSchema = new Schema({
    title: {
        type: String,
        maxlength: 50,
        trim: true,
        required: true 
    },
    description: {
        type: String,
        maxlength: 500,
        trim: true,
        required: true
    },
    time: {
        type: Date,
        // min: Date.now 
        default: Date.now,
        required: true
    },
    place: {
        type: String,
        maxlength: 150,
        trim: true,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        max: 5,
        default: 0
    },
    status: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    category: {
        type: String,
        enum: categoryType,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Review' 
    }],
    limit: {
        type: Number,
        min: 1,
        max: 5
    },
    accepted: {
        type: Number,
        min: 0,
        default: 0
    }
}, { 
    timestamps: true
});

cardSchema.methods.upvote = function(cb) {
    this.upvotes += 1;
    this.save(cb);
}

cardSchema.methods.addReview = function(review, cb) {
    if (!this.reviews) {
        this.reviews.push(review._id);
        this.rating = review.rating;
        this.save(cb);
    }
    else {
        var oldNumber = this.reviews.length;
        this.reviews.push(review._id);
        var newRating = ((this.rating * oldNumber) + review.rating)  / (oldNumber+1);
        this.rating = newRating;
        this.save(cb);
    }
}

mongoose.model('Card', cardSchema);