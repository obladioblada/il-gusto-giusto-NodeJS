

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var User = require('../models/user');
const querystring = require('querystring');


var user;


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
        let token = jwt.sign({user: req.user}, 'secret', { expiresIn: 7200 });
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
    scope : ['email','public_profile']
}));

// =====================================
// DA RIVEDERE PER FACEBOOOK LOGIN =======================================================
// =====================================
// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook'),
    function (req, res) {
        let token = jwt.sign({user: req.user}, 'secret', { expiresIn: 7200 });
        user = { message:'socessfully logged in with facebook',
                token: token,
                user: req.user};
        const query = querystring.stringify({
            "SocialLogin": true,
        });
        res.redirect('/signIn?'+query);
    });


router.post('/data', function(req, res) {
    res.status(201).json(user);
});
// DA RIVEDERE PER FACEBOOOK LOGIN =======================================================


// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}





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
