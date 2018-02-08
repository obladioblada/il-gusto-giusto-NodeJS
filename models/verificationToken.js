var mongoose = require('mongoose');

var Scherma = mongoose.Schema;

// exprires= 43200 = 12 hours
var schema = new Scherma({
    _UserId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
    token: {type: String, required:true },
    createdAt: {type: Date, required: true, default: Date.now(), expires: 43200}
});

module.exports=mongoose.model('VerificationToken',Schema);