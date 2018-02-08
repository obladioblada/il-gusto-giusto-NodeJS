var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var schema = new Schema({

    local:{
        name        :{type: String , required: true},
        surname     :{type: String , required: true},
        password    :{type: String , required: true},
        email       :{
            type        :String,
            required    :true,
            unique      :true,
            lowercase   :true,
            trim        :true
        },
        isVerified  :{
            type        :Boolean,
            default     :false
        }
    },

    facebook:{
        id          :String,
        token       :String,
        name        :String,
        surname     :String,
        email       :String
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