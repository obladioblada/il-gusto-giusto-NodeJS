var express = require('express');
var router = express.Router();

// get all the products for the vassoio
router.get('/', function (req,res, next) {
    res.json({product:"list of products here"});
});





module.exports = router;