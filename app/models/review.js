var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({    
    rating: {
        type: Number,
        min:0,
        max:5
    },
    title: {
        type: String,
        maxlength: 150,
        trim: true
    },
    body: {
        type: String,
        maxlength: 500,
        trim: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    for_card: {
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }
}, { 
    timestamps: true
});

mongoose.model('Review', ReviewSchema);