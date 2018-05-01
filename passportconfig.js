let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let TwitterStrategy = require('passport-twitter').Strategy;
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let cloudinary = require('./cloudinaryconfig');
let User = require('./models/user');

let configAuth = require('./socialauthconfig');
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            console.log("dhdhdhdhdd");
            console.log(req.body.photoUrl);
            process.nextTick(function () {
                User.findOne({
                    $or: [{'local.email': email},
                        {'twitter.email': email},
                        {'google.email': email},
                        {'facebook.email': email}
                    ]
                }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        let userPojo = user.toObject();

                        if (userPojo.hasOwnProperty('local')) {
                            return done(null, false, {'signUpMessage': 'the email is already taken'});
                        }
                        if (userPojo.hasOwnProperty('facebbok') || userPojo.hasOwnProperty('twitter') ||
                            userPojo.hasOwnProperty('google')) {
                            console.log("trovato user con account social");
                            user.local.name = req.body.name;
                            user.local.surname = req.body.surname;
                            user.local.email = email;
                            user.local.password = user.generateHash(password);
                            user.local.photoSrc = req.body.photoSrc;
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
                        console.log(req);
                        cloudinary.uploader.upload(req.body.photoSrc, function (result) {
                            console.log(result)
                        });
                        const newUser = new User();
                        newUser.local = {
                            name: req.body.name,
                            surname: req.body.surname,
                            email: email,
                            password: newUser.generateHash(password),
                            photoSrc: null
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

    passport.use('local-signin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
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

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: configAuth.facebookAuth.profileFields
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                console.log("USER");
                console.log(profile);
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        User.findOne({
                            $or: [{'local.email': profile.email || profile.emails[0].value},
                                {'twitter.email': profile.email || profile.emails[0].value},
                                {'google.email': profile.email || profile.emails[0].value}
                            ]
                        }, function (err, user) {
                            if (err)
                                return done(err);
                            if (user) {
                                console.log("travato local accunt");
                                console.log(user);
                                user.facebook.id = profile.id;
                                user.facebook.token = accessToken;
                                user.facebook.name = profile.name.givenName;
                                user.facebook.surname = profile.name.familyName;
                                user.facebook.photoUrl = profile.photos[0].value;
                                let email = profile.email || profile.emails[0].value;
                                if (!email) {
                                    console.log('this user has no email in his fb');
                                    return done({message: 'this user has no email in his fb'});
                                }
                                user.facebook.email = email;
                                user.save(function (err) {
                                    if (err)
                                        throw err;
                                    return done(null, user);
                                });
                            } else {
                                console.log("local accunt non trovate");
                                let newUser = new User();
                                console.log(profile);
                                newUser.facebook.id = profile.id;
                                newUser.facebook.token = accessToken;
                                newUser.facebook.name = profile.name.givenName;
                                newUser.facebook.surname = profile.name.familyName;
                                newUser.facebook.photoUrl = profile.photos[0].value;
                                let email = profile.email || profile.emails[0].value;
                                if (!email) {
                                    console.log('this user has no email in his fb');
                                    return done({message: 'this user has no email in his fb'});
                                }
                                newUser.facebook.email = email;
                                newUser.save(function (err) {
                                    if (err)
                                        throw err;
                                    return done(null, newUser);
                                });
                            }
                        });
                    }
                });
            });
        }));
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
                    if (err) return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        User.findOne({
                            $or: [{'local.email': profile.email || profile.emails[0].value},
                                {'facebook.email': profile.email || profile.emails[0].value},
                                {'google.email': profile.email || profile.emails[0].value}
                            ]
                        }, function (err, user) {
                            if (err)
                                return done(err);
                            if (user) {
                                console.log(user);
                                user.twitter.id = profile.id;
                                user.twitter.token = token;
                                user.twitter.name = profile.name;
                                user.twitter.displayName = profile.displayName;
                                user.twitter.photoUrl = profile.photos[0].value;
                                let email = profile.email || profile.emails[0].value;
                                if (!email) {
                                    console.log('this user has no email in his fb');
                                    return done({message: 'this user has no email in his fb'});
                                }
                                user.twitter.email = email;
                                user.save(function (err) {
                                    if (err)
                                        throw err;
                                    return done(null, user);
                                });
                            } else {
                                let newUser = new User();
                                newUser.twitter.id = profile.id;
                                newUser.twitter.token = token;
                                newUser.twitter.name = profile.name;
                                newUser.twitter.displayName = profile.displayName;
                                newUser.twitter.photoUrl = profile.photos[0].value;
                                let email = profile.email || profile.emails[0].value;
                                if (!email) {
                                    console.log('this user has no email in his fb');
                                    return done({message: 'this user has no email in his fb'});
                                }
                                newUser.twitter.email = email;
                                newUser.save(function (err) {
                                    if (err)
                                        throw err;
                                    return done(null, newUser);
                                });
                            }
                        });
                    }
                });
            });
        }
    ));

    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
    }, function (token, refreshToken, profile, done) {
        process.nextTick(function () {

            User.findOne({'google.id': profile.id}, function (err, user) {

                if (err) return done(err);
                if (user) return done(null, user);
                else {
                    User.findOne({
                        $or: [{'local.email': profile.email || profile.emails[0].value},
                            {'facebook.email': profile.email || profile.emails[0].value},
                            {'twitter.email': profile.email || profile.emails[0].value}
                        ]
                    }, function (err, user) {
                        if (err)
                            return done(err);
                        if (user) {
                            console.log("travato local accunt");
                            user.google.id = profile.id;
                            user.google.token = token;
                            user.google.name = profile.displayName.toString().split(" ")[0];
                            user.google.surname = profile.displayName.toString().split(" ")[1];
                            user.google.photoUrl = profile.photos[0].value;
                            let email = profile.email || profile.emails[0].value;
                            if (!email) {
                                console.log('this user has no email in his fb');
                                return done({message: 'this user has no email in his fb'});
                            }
                            user.google.email = email;
                            user.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        } else {
                            let newUser = new User();
                            newUser.google.id = profile.id;
                            newUser.google.token = token;
                            newUser.google.name = profile.displayName.toString().split(" ")[0];
                            newUser.google.surname = profile.displayName.toString().split(" ")[1];
                            newUser.google.photoUrl = profile.photos[0].value;
                            let email = profile.email || profile.emails[0].value;
                            if (!email) {
                                console.log('this user has no email in his fb');
                                return done({message: 'this user has no email in his fb'});
                            }
                            newUser.google.email = email;
                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });
                }
            });
        });
    }));
};
