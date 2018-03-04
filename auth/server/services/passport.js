const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = {
  usernameField: 'email' // localStrategy use `username` field as default -> set this to `email` instead
};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // verify this username & password, call done with the user
  // if it's correct
  // else, call done with false
  User.findOne({email: email}, function(err, user) {
    if (err) { return done(err); }

    if (!user) { return done(null, false); }

    // compare password with password hashed
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }

      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});


// setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};


// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if the userId in payload exists in db
  // if it does, call `done` with that user
  // else, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);