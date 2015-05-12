var login = require('./login');
var singUp = require('./singUp');
var User = require('../models/user');

module.exports = function (passport) {

    // Passport will serialize and deserialize user instances to and from the session
    passport.serializeUser(function (user, done) {
        console.log('serializing user: ' + user);
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            console.log('deserializing user: ' + user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and Registration
    login(passport);
    singUp(passport);

};