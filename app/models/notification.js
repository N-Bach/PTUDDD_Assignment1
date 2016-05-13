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
    },
    status: {
        // 0 means new noti
        // 1 means sent noti
        type: Number,
        min: 0,
        max: 1,
        default: 0        
    },
    studentName: {
        type: String,
        maxlength: 150
    },
    teacherName: {
        type: String,
        maxlength: 150
    },
    cardName: {
        type: String,
        maxlength: 150
    }
}, { 
    timestamps: true
});

NotificationSchema.methods.updateStatus = function(cb) {
    this.status = 1;
    this.save(cb);
}

mongoose.model('Notification', NotificationSchema);