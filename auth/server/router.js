const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// middleware for checking authentication for requests
const requireAuth = passport.authenticate( 'jwt', { session: false } );

module.exports = function(app) {

  /**
   * req: request
   * res: response
   * next: mostly for error handling
   */
  app.get('/', requireAuth, function(req, res, next) {
    res.send({status: 'OK'})
  });

  app.post('/signup', Authentication.signup);

}