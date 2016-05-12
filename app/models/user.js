var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String
    },
    bio: {
        firstName: {
            type: String,
            default: 'some first name'
        },
        lastName: {
            type: String,
            default: 'some last name'
        },
        age: {
            type: Number,
            default: 10
        },
        university: {
            type: String,
            default: 'some University'
        },
        phoneNumber: {
            type: String,
            default: '090111111'
        }
    },
    image: [String],
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    upvoted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card' 
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review' 
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
    }],
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'   
    }]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

userSchema.methods.addReview = function(reviewid, cb) {
    this.reviews.push(reviewid);
    this.save(cb);
}

userSchema.methods.addStudent = function(studentid, cb) {
    this.students.push(studentid);
    this.save(cb);
}

userSchema.methods.addTeacher = function(teacherid, cb) {
    this.teachers.push(teacherid);
    this.save(cb);
}

userSchema.methods.addUpvotedCard = function(cardid, cb) {
    this.upvoted.push(cardid);
    this.save(cb);
}

mongoose.model('User', userSchema);
