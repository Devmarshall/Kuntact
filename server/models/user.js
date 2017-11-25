var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var textSearch = require('mongoose-text-search');
var searchable = require('mongoose-searchable')

var userSchema = mongoose.Schema({

    userName: String,
    mySkills: [{
        Name: String,
        Description: String
    }],
    local: {
        email: String,
        password: String
    },
    signUpDate: {
        type: Date,
        default: Date.now
    },
    phoneNumber: String,
    token: String

});


// Give Schema text-search capabilities with mongoose-text-search
userSchema.plugin(searchable);
userSchema.index({ '$**': 'text' });

// Schema methods

// Generate password hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
// Check if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);