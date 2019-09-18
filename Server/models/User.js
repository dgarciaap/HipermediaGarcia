const mongoose = require('mongoose');
//const Schema = mongoose.Schema; same thing as line below
const {Schema} = mongoose;

userSchema = new Schema({
    googleId: String
});

//name and schema (we want to create a new collection named 'users')
mongoose.model('users', userSchema);