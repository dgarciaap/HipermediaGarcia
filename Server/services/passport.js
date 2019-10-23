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
        callbackURL: '/auth/google/callback',
        proxy: true
        //google returns an accessToken (profile contains google user's id)
        //Identify function and write async
    }, async (accessToken, refreshToken, profile, done) => {
        //Look if it's already in our db (it returns a promise)
        //Identify promise and write await. Assign it to a variable
        const existingUser = await User.findOne({googleId: profile.id});

        if(existingUser) {
            // we already have a record with the given profile id
            return done(null, existingUser);
        } 
        //create a new one if there is none and save it into mongoose
        //Identify promise and write await. Assign it to a variable
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
        }
    )
);