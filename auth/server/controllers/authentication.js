const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret);
}

exports.signin = function(req, res, next) {
  // `done` callback supplied by `passport` ( `done(null, user)` ), take the `user` and assign it to `req.user`
  res.send({
    success: true,
    token: tokenForUser(req.user)
  })
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // validate input
  if (!email || !password) {
    return res.status(422).send({
      error: 'Must provide email and password'
    })
  }

  // check if user with email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // if a user exists, return an error
    if (existingUser) {
      return res.status(422).send({
        error: 'Email is in use'
      });
    }

    // if a user does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) {
        return next(err);
      }

      // respond to request indicating the user was created
      res.json({
        success: true,
        token: tokenForUser(user)
      });
    });

  });
  
}