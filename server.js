var express = require('express'),
    path = require('path'),
    http = require('http');

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 80);
  app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, 'public')));
});

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log("Server listening on port " + app.get('port'));
});