var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({    
    rating: {
        type: Number,
        min:0,
        max:5,
        required: true
    },
    title: {
        type: String,
        maxlength: 150,
        trim: true,
        required: true
    },
    description: {
        type: String,
        maxlength: 500,
        trim: true,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    for_card: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    }
}, { 
    timestamps: true
});

mongoose.model('Review', ReviewSchema);