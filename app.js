var express = require('express'),
    list = require('./routes/list'),
    routes = require('./routes'),
    errors = require('./errorHandler'),
    app = express(),
    port = 8000;

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());

  app.set('view engine', 'jade');
  app.engine('jade', require('jade').__express);

  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev'));
  app.use(express.favicon());

  app.use(app.router);

  app.use(errors.logErrors);
  app.use(errors.clientError);
  app.use(errors.errorHandler);
});

app.get('/mailinglist', routes.mailinglist);
app.get('/', routes.index);
app.post('/list', list.post);


// function handleError(err, req, res, next) {
//   console.error(err.message);
//   console.error(err.stack);
//   res.status(500);
//   res.render('error', { error: err });
// }

// // Errors - need 404 too
// //  Create log Error
// //          clientError
// //           handleError
// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   // Change this to styled page.
//   res.send(500, 'Something broke!');
// });






app.listen(port);
console.log('Express listening on port %d', port)