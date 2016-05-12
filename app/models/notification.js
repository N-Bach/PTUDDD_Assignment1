var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({    
    description: {
        type: String,
        maxlength: 200,
        trim: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    for_card: {
        type: Schema.Types.ObjectId,
        ref: 'Card'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'    
    }
}, { 
    timestamps: true
});

mongoose.model('Notification', NotificationSchema);