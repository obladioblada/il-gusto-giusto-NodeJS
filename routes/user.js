let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let passport = require('passport');
let User = require('../models/user');
let querystring = require('querystring');
let multer = require('multer');
let storage = multer.memoryStorage();
let upload = multer({storage: storage});
let cloudinary = require('../cloudinaryconfig');
let user;

router.post('/signup', upload.single('image'), function (req, res, next) {
        console.log(req.file.buffer);
        cloudinary.v2.uploader.upload_stream(
            {
                resource_type: 'image',
                gravity: "face",
                width: 150,
                height: 150,
                zoom: "0.7",
                crop: "thumb",
                timeout: 120000,
            },
            function (error, result) {
                console.log(error);
                console.log(result);
                req.body.photoUrl = result.url;
                console.log("caricata, il body dovrebbe contenerla, move on");
                next();
            }).end(req.file.buffer);
        console.log("aspetto che carica");
        delete req.file;
    }, passport.authenticate('local-signup'),
    function (req, res) {
        console.log("bsnsjsj");
        res.status(201).json({
            message: 'User created',
            obj: req.user
        })
    }
);

router.post('/signin', passport.authenticate('local-signin'),
    function (req, res) {
        let token = jwt.sign({user: req.user}, 'secret', {expiresIn: 7200});
        res.status(201).json({
            message: 'socessfully logged in',
            token: token,
            user: req.user
        });
    });

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
}));
router.get('/auth/facebook/callback', passport.authenticate('facebook'), function (req, res) {
    let token = jwt.sign({user: req.user}, 'secret', {expiresIn: 7200});
    user =
        {
            message: 'socessfully logged in with facebook',
            token: token,
            user: req.user,
            social: 'facebook'
        };
    const query = querystring.stringify({
        "SocialLogin": true,
    });
    res.redirect('/signIn?' + query);
});

router.post('/data', function (req, res) {
    res.status(201).json(user);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter'), function (req, res) {
    let token = jwt.sign({user: req.user}, 'secret', {expiresIn: 7200});
    user = {
        message: 'socessfully logged in with facebook',
        token: token,
        user: req.user,
        social: 'twitter'
    };
    const query = querystring.stringify({
        "SocialLogin": true,
    });
    res.redirect('/signIn?' + query);
});

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google'), function (req, res) {
    let token = jwt.sign({user: req.user}, 'secret', {expiresIn: 7200});
    user = {
        message: 'socessfully logged in with facebook',
        token: token,
        user: req.user,
        social: 'google'
    };
    const query = querystring.stringify({
        "SocialLogin": true,
    });
    res.redirect('/signIn?' + query);
});
router.post('/checkemail', function (req, res, next) {
    User.findOne({'local.email': req.body.email}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error accured',
                error: err
            });
        }
        if (!user) {
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
