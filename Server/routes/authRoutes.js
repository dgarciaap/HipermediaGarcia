const passport = require('passport');

//get app (express) constant from servidor.js
module.exports = (app) => {
//ROUTE HANDLER
//passport authenticates user through googleStrategy and it will bring the user's profile and email
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
})
);

//passport will do something with the code and return a token (arrow function in passport.use GoogleStrategy)
app.get('/auth/google/callback', passport.authenticate('google'));
};