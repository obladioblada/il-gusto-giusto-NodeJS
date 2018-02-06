var mangoose = require('mongoose');

var Schema = mangoose.Schema;

var schema = new Schema({
    date: {type: String , required: true},
    user: {type: String , required: true},
    total: {type: Number , required: true},
    products: [{type: Schema.Type.ObjectId, ref: 'Product'}]
});


module.exports = mangoose.model('Purchase', schema);