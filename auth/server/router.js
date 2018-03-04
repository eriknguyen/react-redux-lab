module.exports = function(app) {

  /**
   * req: request
   * res: response
   * next: mostly for error handling
   */
  app.get('/', function(req, res, next) {
    res.send({status: 'OK'})
  });

}