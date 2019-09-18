const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//We need to load the schema and then passport(we need the schema in there)
require('./models/User');
require('./services/passport');


const app = express();

//requires function and sends app parameter
require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const PORT = process.env.PORT || 5000;
app.listen(PORT);