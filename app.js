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

  app.use(errors.logError);
  app.use(errors.ajaxError);
  app.use(errors.errorHandler);
});

app.get('/mailinglist', routes.mailinglist);
app.get('/', routes.index);
app.post('/list', list.post);
app.get('/*', routes.handleNotFound);

app.listen(port);
console.log('Express listening on port %d', port);