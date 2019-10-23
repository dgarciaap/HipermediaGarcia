const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
//We need to load the schema and then passport(we need the schema in there)
require('./models/User');
require('./services/passport');


const app = express();

//CookieSession configuration
app.use(
    cookieSession({
        //30 days in milliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//requires function and sends app parameter
require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT);