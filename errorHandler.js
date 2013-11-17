var colors = require('colors'),
    NotFound = require('./NotFound.js');

var errors = {

    logError: function(err, req, res, next) {
      console.error(err.stack.yellow);
      next(err);
    },

    ajaxError: function(err, req, res, next) {
      if (req.xhr) {
        res.send(500, { error: err.message });
      } else {
        next(err);
      }
    },

    errorHandler: function(err, req, res, next) {
      if (err instanceof NotFound) {
        res.render('404');
      }

      res.render('error', { error: err });
    }

};

module.exports = errors;