// set up Passport
const req = require("express/lib/request");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userModel");

passport.serializeUser((user, done) => {
    done(undefined, user);
});

passport.deserializeUser((_id, done) => {
    User.findById(_id, { password: 0 }, (err, user) => {
        if (err) {
            return done(err, undefined);
        }
        if (!user) {
            done("pass");
        } else {
            return done(undefined, user);
        }
    });
});

// Set up "local" strategy, i.e. authentication based on username/password. There are other types of strategy too.

var userStrategy = new LocalStrategy((username, password, cb) => {
    // first, check if there is a user in the db with this username
    User.findOne({ email: username }, {}, {}, (err, user) => {
        if (err) {
            return cb(null, false, { message: "Unknown error" });
        }
        if (!user) {
            return cb(null, false, { message: "Incorrect username or password" });
        }
        // if there is a user with this username, check if the password matches
        user.verifyPassword(password, (err, valid) => {
            if (err) {
                return cb(null, false, { message: "Unknown error" });
            }
            if (!valid) {
                return cb(null, false, { message: "Incorrect username or password" });
            }
            return cb(null, user);
        });
    });
});

passport.use("user", userStrategy);

module.exports = passport;
