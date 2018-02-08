var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var User = require('../models/user');


//signUp post 
router.post('/signup',  passport.authenticate('local-signup'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.status(201).json({
            message: 'User created',
            obj: req.user
        })
    }
);

//signIn
router.post('/signin', passport.authenticate('local-signin'),
    function (req, res) {
        var token = jwt.sign({user: req.user}, 'secret', { expiresIn: 7200 });
        res.status(201).json({
            message:'socessfully logged in',
            token: token,
            user: req.user
        });
    });


// =====================================
// FACEBOOK ROUTES =====================
// =====================================

// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope : ['public_profile', 'email']
}));


// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook'),
    function (req, res) {
        res.status(201).json({
            message:'socessfully logged in with facebook'
        });
    });


// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



router.post('/checkemail', function (req, res,next) {
    console.log(req.body.email);
    User.findOne({'local.email': req.body.email}, function (err, user) {
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
