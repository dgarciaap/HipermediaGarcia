const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Hiding the psw (db connection string) with dotenv
require('dotenv/config');

//---Another middleware (don't know why it only works above routes require)
//body parser to json (posts format)
app.use(bodyParser.json());
//More middlewares (cors is for having access from others)
app.use(cors());

//Import routes
const postsRoute = require('./routes/posts');

//Middlewares////////////

//go into posts 
app.use('/posts', postsRoute);


//Middlewares = a function that executes itself everytime a specific route is hit
/*app.use('/posts', () => {
    console.log('This is a middleware running');
});*/

//Connect to mongodb
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('Connected to db!'));

//Start listening
app.listen(3000);