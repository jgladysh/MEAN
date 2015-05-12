var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

    passport.use('login', new LocalStrategy({
                passReqToCallback: true
            },
            function (req, username, password, done) {
                // check in mongo if a user with username exists or not
                User.findOne({'username': username},
                    function (err, user) {
                        // Check for errors
                        if (err)
                            return done(err);
                        // If username does not exist, log the error and redirect back
                        if (!user) {
                            console.log('Incorrect username ' + username);
                            return done(null, false);
                        }
                        // If user exists but wrong password, log the error
                        if (!isValidPassword(user, password)) {
                            console.log('Incorrect password');
                            return done(null, false); // redirect back to login page
                        }
                        // User and password both match, return user from done method
                        return done(null, user);
                    }
                );

            })
    );

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }

};