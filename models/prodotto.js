var mangoose = require('mongoose');

var Schema = mangoose.Schema;

var schema = new Schema({
    name: {type: String , required: true},
    descrizione: {type: String , required: true},
    prezzo: {type: Number , required: true},
    tipo: {type: String , required: true}
});

module.exports = mangoose.model('Product', schema);