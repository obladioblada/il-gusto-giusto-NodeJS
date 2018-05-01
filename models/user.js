var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var schema = new Schema({

    local           : {
        name        :String,
        surname     :String,
        password    :String,
        email       :String,
        photoUrl    :String
    },
    facebook        : {
        id          :String,
        token       :String,
        name        :String,
        surname     :String,
        email       :String,
        photoUrl    :String
    },
    twitter         : {
        id          : String,
        token       : String,
        displayName : String,
        name        : String,
        email       : String,
        photoUrl     :String
    },
    google          : {
        id          : String,
        token       : String,
        email       : String,
        name        : String,
        surname     : String,
        photoUrl    : String
    }
});


// methods
// generating a  hash

schema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password,10);
};

// checking inf password is valid
schema.methods.validPassword = function (password) {
    return  bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', schema);