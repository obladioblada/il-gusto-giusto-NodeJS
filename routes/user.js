var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var User = require('../models/user');



//signUp post 
router.post('/', function (req,res, next) {
        var user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email:  req.body.email,
            password: bcrypt.hashSync(req.body.password,10)
        });

        //console.log(user);

        user.save( function (err, result) {

            if(err){
                return res.status(500).json({
                    title: 'An error accured',
                    error: err
                });
            }

            res.status(201).json({
                message: 'User created',
                obj: result
            })
        });
});



//signIn
router.post('/signin', function (req, res,next) {

    User.findOne({email: req.body.email}, function (err, user) {
        if(err){
            return res.status(500).json({
                title: 'An error accured',
                error: err
            });
        }
        if(!user){
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'invalid login credentials'}
            });
        }

        //if password are not the same
        if(!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'invalid login credentials'}
            });
        }

        //create token fot client
        var token = jwt.sign({user: user}, 'secret', { expiresIn: 7200 });
        res.status(201).json({
            message:'socessfully logged in',
            token: token,
            userId: user._id
        });
    });

});

router.post('/checkemail', function (req, res,next) {
    console.log(req.body.email);
    User.findOne({email: req.body.email}, function (err, user) {
        if(err){
            return res.status(500).json({
                title: 'An error accured',
                error: err
            });
        }
        if(!user){
            return res.status(200).json({
                emailFound: false
            });
        }
        res.status(200).json({
            emailFound: true
        });
    });

});


module.exports = router;
