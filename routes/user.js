let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let passport = require('passport');
let User = require('../models/user');
let querystring = require('querystring');

let user;


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

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback', passport.authenticate('facebook'), function (req, res) {
        let token = jwt.sign({user: req.user}, 'secret', { expiresIn: 7200 });
        user =
            { message:'socessfully logged in with facebook',
                token: token,
                user: req.user,
                social:'facebook'
            };
        const query = querystring.stringify({
            "SocialLogin": true,
        });
        res.redirect('/signIn?'+query);
    });



// send user data to client when a social login occured
router.post('/data', function(req, res) {
    res.status(201).json(user);
});


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

// =====================================
// TWITTER ROUTES ======================
// =====================================


// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
router.get('/auth/twitter', passport.authenticate('twitter'));


// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/twitter/callback', passport.authenticate('twitter'), function (req, res) {
        let token = jwt.sign({user: req.user}, 'secret', { expiresIn: 7200 });
        user = {
            message:'socessfully logged in with facebook',
            token: token,
            user: req.user,
            social:'twitter'
        };
        const query = querystring.stringify({
            "SocialLogin": true,
        });
        res.redirect('/signIn?'+query);
    });




// =====================================
// GOOGLE ROUTES =======================
// =====================================


router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));



router.get('/auth/google/callback', passport.authenticate('google'), function (req, res) {
    let token = jwt.sign({user: req.user}, 'secret', { expiresIn: 7200 });
    user = {
        message:'socessfully logged in with facebook',
        token: token,
        user: req.user,
        social:'google'
    };
    const query = querystring.stringify({
        "SocialLogin": true,
    });
    res.redirect('/signIn?'+query);
});



//EMAIL CHECKING =====================================


router.post('/checkemail', function (req, res,next) {
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
