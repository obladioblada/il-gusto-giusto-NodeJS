var mangoose = require('mangoose');

var Schema = mangoose.Schema;

var schema = new Schema({
    firstName: {type: String , required: true},
    lastName: {type: String , required: true},
    password: {type: Number , required: true},
    email: {type: String , required: true, unique: true},
    purchases: [{type: Schema.Type.ObjectId, ref: 'Purchase'}]
});

module.exports = mangoose.model('User', schema);