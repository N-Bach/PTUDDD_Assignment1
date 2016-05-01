var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoryType = 'English Japanese German Chinese French Finland Vietnamese Spanish'.split(' ');

var cardSchema = new Schema({
    title: {
        type: String,
        maxlength: 50,
        trim: true 
    },
    description: {
        type: String,
        maxlength: 500,
        trim: true
    },
    time: {
        type: Date,
        // min: Date.now 
        default: Date.now
    },
    place: {
        type: String,
        maxlength: 150,
        trim: true
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
        enum: categoryType
    },
    create_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { 
    timestamps: true
});

cardSchema.methods.upvote = function(cb) {
    this.upvotes += 1;
    this.save(cb);
}

module.exports = mongoose.model('Card', cardSchema);