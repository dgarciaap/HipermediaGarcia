const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//import schema
const User = mongoose.model('users');

//set-Cookie
passport.serializeUser((user, done) => {
    //userID different than google's one (first attribute of our collection)
    done(null, user.id);
});

//We'll look for the user in our db
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

//passport will use google's login (u could add more)
passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        //add routeHandler (Added below)
        callbackURL: '/auth/google/callback'
        //google returns an accessToken (profile contains google user's id)
    }, (accessToken, refreshToken, profile, done) => {
        //Look if it's already in our db (it returns a promise)
        User.findOne({googleId: profile.id})
            .then((existingUser) => {
                if(existingUser) {
                    // we already have a record with the given profile id
                    done(null, existingUser);
                } else {
                    //create a new one if there is none and save it into mongoose
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user)); 
                }
            });
        }
    )
);