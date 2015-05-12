var mongoose = require('mongoose');

// define user model
module.exports = mongoose.model('User', {
    username: String,
    password: String,
    email: String
});
