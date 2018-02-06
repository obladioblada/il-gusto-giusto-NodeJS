var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String , required: true},
    surname: {type: String , required: true},
    password: {type: String , required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    isVerified:{
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', schema);