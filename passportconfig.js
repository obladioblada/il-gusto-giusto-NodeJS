var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require('bcryptjs');

//load user model
var User = require('./models/user');

// load the auth variables
var configAuth = require('./socialauthconfig');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })

    // used to deserialize user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({
                    $or: [{'local.email': email},
                        {'twitter.email': email},
                        {'google.email': email},
                        {'facebook.email': email}
                    ]
                }, function (err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        return done(err);
                    }

                    // check to see if theres already a user with that email

                    if (user) {
                        var userPojo = user.toObject();

                        if (userPojo.hasOwnProperty('local')) {
                            console.log("trovato user con local account");
                            return done(null, false, {'signUpMessage': 'the email is already taken'});
                        }
                        if (userPojo.hasOwnProperty('facebbok')  || userPojo.hasOwnProperty('twitter') || userPojo.hasOwnProperty('google')) {
                            console.log("trovato user con account social");
                            user.local.name = req.body.name;
                            user.local.surname = req.body.surname;
                            user.local.email = email;
                            user.local.password = user.generateHash(password);
                            // save the user
                            user.save(function (err) {
                                if (err) {
                                    throw err
                                }
                                return done(null, user);
                            });
                        }
                    }
                    else {
                        //if the use has at least one of the social account, then update the user information, otherwise create a new one

                        // let's create a new user
                        var newUser = new User();
                        newUser.local = {
                            name: req.body.name,
                            surname: req.body.surname,
                            email: email,
                            password: newUser.generateHash(password)
                        };

                        // save the user
                        newUser.save(function (err) {
                            if (err) {
                                throw err
                            }
                            return done(null, newUser);
                        });
                    }
                })
            })
        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({'local.email': req.body.email}, function (err, user) {

                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);
                // if no user is found, return the message

                if (!user)
                    return done(null, false, {message: 'Incorrect email.'});
                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, {message: 'incorrect password'});

                // all is well, return successful user
                return done(null, user);
            });


        }));


    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: configAuth.facebookAuth.profileFields
        },
        // facebook will send back the token and profile
        function (accessToken, refreshToken, profile, done) {

            console.log(profile);
            // asynchronous
            process.nextTick(function () {
                // find the user in the database based on their facebook id
                User.findOne({'facebook.id': profile.id}, function (err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, check if there is a user with the same email
                        User.findOne({
                            $or: [{'local.email': profile.email || profile.emails[0].value},
                                {'twitter.email': profile.email || profile.emails[0].value},
                                {'google.email': profile.email || profile.emails[0].value}
                            ]
                        }, function (err, user) {

                            // if there is an error, stop everything and return that
                            // ie an error connecting to the database

                            if (err)
                                return done(err);

                            //if user is found , then let's crate an email field for the local account
                            if (user) {
                                console.log("travato local accunt");
                                console.log(user);
                                user.facebook.id = profile.id;
                                user.facebook.token = accessToken;
                                user.facebook.name = profile.name.givenName;
                                user.facebook.surname = profile.name.familyName;
                                var email = profile.email || profile.emails[0].value;
                                if (!email) {
                                    console.log('this user has no email in his fb');
                                    return done({message: 'this user has no email in his fb'});
                                }
                                user.facebook.email = email; // facebook can return multiple emails so we'll take the first
                                // save our user to the database
                                user.save(function (err) {
                                    if (err)
                                        throw err;

                                    // if successful, return the new user
                                    return done(null, user);
                                });
                            } else {
                                console.log("local accunt non trovate");
                                // if there is no user found with that facebook id, create them
                                var newUser = new User();

                                // set all of the facebook information in our user model
                                newUser.facebook.id = profile.id;
                                newUser.facebook.token = accessToken;
                                newUser.facebook.name = profile.name.givenName;
                                newUser.facebook.surname = profile.name.familyName;
                                var email = profile.email || profile.emails[0].value;
                                if (!email) {
                                    console.log('this user has no email in his fb');
                                    return done({message: 'this user has no email in his fb'});
                                }
                                newUser.facebook.email = email; // facebook can return multiple emails so we'll take the first

                                // save our user to the database
                                newUser.save(function (err) {
                                    if (err)
                                        throw err;

                                    // if successful, return the new user
                                    return done(null, newUser);
                                });

                            }

                        });
                    }
                });

            });
        }));


    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================

    passport.use(new TwitterStrategy({
            consumerKey: configAuth.twitterAuth.consumerKey,
            consumerSecret: configAuth.twitterAuth.consumerSecret,
            callbackURL: configAuth.twitterAuth.callbackURL,
            includeEmail: true
        }, function (token, tokenSecret, profile, done) {

            console.log(profile);
            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Twitter
            process.nextTick(function () {

                User.findOne({'twitter.id': profile.id}, function (err, user) {
                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err) return done(err);

                    // if the user is found then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {


                        // if there is no user found with that facebook id, check if there is a user with the same email
                        User.findOne({
                            $or: [{'local.email': profile.email || profile.emails[0].value},
                                {'facebook.email': profile.email || profile.emails[0].value},
                                {'google.email': profile.email || profile.emails[0].value}
                            ]
                        }, function (err, user) {

                            // if there is an error, stop everything and return that
                            // ie an error connecting to the database

                            if (err)
                                return done(err);

                            //if user is found , then let's crate an email field for the local account
                            if (user) {
                                console.log("travato local accunt");
                                console.log(user);
                                user.twitter.id = profile.id;
                                user.twitter.token = token;
                                user.twitter.name = profile.name;
                                user.twitter.displayName = profile.displayName;
                                var email = profile.email || profile.emails[0].value;
                                if (!email) {
                                    console.log('this user has no email in his fb');
                                    return done({message: 'this user has no email in his fb'});
                                }
                                user.twitter.email = email; // facebook can return multiple emails so we'll take the first
                                // save our user to the database
                                user.save(function (err) {
                                    if (err)
                                        throw err;

                                    // if successful, return the new user
                                    return done(null, user);
                                });
                            } else {
                                console.log("local accunt non trovate");
                                // if there is no user found with that facebook id, create them
                                // if there is no user, create them
                                var newUser = new User();
                                newUser.twitter.id = profile.id;
                                newUser.twitter.token = token;
                                newUser.twitter.name = profile.name;
                                newUser.twitter.displayName = profile.displayName;
                                var email = profile.email || profile.emails[0].value;
                                if (!email) {
                                    console.log('this user has no email in his fb');
                                    return done({message: 'this user has no email in his fb'});
                                }
                                newUser.twitter.email = email; // facebook can return multiple emails so we'll take the first

                                // save our user to the database
                                newUser.save(function (err) {
                                    if (err)
                                        throw err;

                                    // if successful, return the new user
                                    return done(null, newUser);
                                });

                            }

                        });

                    }


                });

            });
        }
    ));


    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================


    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
    }, function (token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google

        process.nextTick(function () {

            User.findOne({'google.id': profile.id}, function (err, user) {

                if (err) return done(err);
                if (user) return done(null, user);
                else {


                    // if there is no user found with that facebook id, check if there is a user with the same email
                    User.findOne({
                        $or: [{'local.email': profile.email || profile.emails[0].value},
                            {'facebook.email': profile.email || profile.emails[0].value},
                            {'twitter.email': profile.email || profile.emails[0].value}
                        ]
                    }, function (err, user) {

                        // if there is an error, stop everything and return that
                        // ie an error connecting to the database

                        if (err)
                            return done(err);

                        //if user is found , then let's crate an email field for the local account
                        if (user) {
                            console.log("travato local accunt");
                            console.log(user);
                            user.google.id = profile.id;
                            user.google.token = token;
                            user.google.name = profile.displayName;
                            var email = profile.email || profile.emails[0].value;
                            if (!email) {
                                console.log('this user has no email in his fb');
                                return done({message: 'this user has no email in his fb'});
                            }
                            user.google.email = email; // facebook can return multiple emails so we'll take the first
                            // save our user to the database
                            user.save(function (err) {
                                if (err)
                                    throw err;

                                // if successful, return the new user
                                return done(null, user);
                            });
                        } else {
                            console.log("local accunt non trovate");
                            // if there is no user found with that facebook id, create them
                            // if there is no user, create them
                            var newUser = new User();
                            newUser.google.id = profile.id;
                            newUser.google.token = token;
                            newUser.twitter.name = profile.displayName;
                            var email = profile.email || profile.emails[0].value;
                            if (!email) {
                                console.log('this user has no email in his fb');
                                return done({message: 'this user has no email in his fb'});
                            }
                            newUser.google.email = email; // facebook can return multiple emails so we'll take the first

                            // save our user to the database
                            newUser.save(function (err) {
                                if (err)
                                    throw err;

                                // if successful, return the new user
                                return done(null, newUser);
                            });

                        }

                    });
                }


            });


        });


    }));


};
