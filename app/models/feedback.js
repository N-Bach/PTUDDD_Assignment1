var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedBackSchema = new Schema({
    title: {
        type: String,
        maxlength: 150,
        trim: true
    },
    description: {
        type: String,
        maxlength: 800,
        trim: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { 
    timestamps: true
});

mongoose.model('FeedBack', FeedBackSchema);