var express = require('express'),
    path = require('path'),
    http = require('http'),
    rooms = require('./routes/room'),
    questions = require('./routes/questions');

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 8080);
  app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, 'public')));
});

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log("Server listening on port " + app.get('port'));
});

app.get('/rooms', rooms.findAll);
app.post('/rooms', rooms.addRoom);
app.get('/rooms/:id', rooms.findById);
app.put('/rooms/:id', rooms.updateRoom);
app.delete('/rooms/:id', rooms.deleteRoom);

app.get('/rooms/:id/questions', rooms.findAll);
app.post('/rooms/:id/questions', rooms.addRoom);
app.get('/rooms/:id/questions/:id', rooms.findById);
app.put('/rooms/:id/questions/:id', rooms.updateRoom);
app.delete('/rooms/:id/questions/:id', rooms.deleteRoom);

app.get('/rooms/:id/questions/:id/answers', rooms.findAll);
app.post('/rooms/:id/questions/:id/answers', rooms.addRoom);
app.get('/rooms/:id/questions/:id/answers/:id', rooms.findById);
app.put('/rooms/:id/questions/:id/answers/:id', rooms.updateRoom);
app.delete('/rooms/:id/questions/:id/answers/:id', rooms.deleteRoom);