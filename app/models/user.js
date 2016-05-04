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
    image: [String]

});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

mongoose.model('User', userSchema);
