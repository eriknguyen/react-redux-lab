const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// on save hook, encrypt password
// add function to run before the model is saved with `.pre`
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with hashed password
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;