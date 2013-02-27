var mongo = require('mongodb');

var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('appdb', server, {safe: true});

db.open(function(err, db) {
  if(!err)
    console.log("Connected to 'appdb' database");
});


exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving question: ' + id);
  db.collection('questions', function(err, collection) {
    collection.findOne({'_id':new BSON.ObjectID(id)}, {_id:0}, function(err, item) {
      res.send({questions:item});
    });
  });
};

exports.findAll = function(req, res) {
  db.collection('questions', function(err, collection) {
    collection.find({}, {_id:0}).toArray(function(err, items) {
      res.send({questions:items});
    });
  });
};

exports.addQuestion = function(req, res) {
  var question = req.body;
  console.log('Adding question: ' + JSON.stringify(question));
  db.collection('questions', function(err, collection) {
    collection.insert(question, {safe:true}, function(err, result) {
      var temp = result[0]._id;
      var check = result[0].question.title;
      result[0].question.room = req.params.id;
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        delete result[0]._id;
        res.send(result[0]);
        result[0].question.id = temp;
        collection.update({question:{title: check}}, result[0].question, function(err, panda) {
          console.log(panda + " : Success");
        });
      }
      db.collection('rooms', function(err, rooms) {
        rooms.update({_id:new BSON.ObjectID(req.params.id)}, {$push:{room:{questions_id:{id:new BSON.ObjectID(temp)}}}});
      });
    });
  });
};

exports.updateQuestion = function(req, res) {
  var id = req.params.id;
  var question = req.body;
  delete question._id;
  console.log('Updating question: ' + id);
  console.log(JSON.stringify(question));
  db.collection('questions', function(err, collection) {
    collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, oldQuestion) {
      // question.question.answers = oldQuestion.question.answers;
      question.question.room_id = oldQuestion.question.room_id;
      question.question.id = oldQuestion.question.id;
      collection.update({'_id':new BSON.ObjectID(id)}, question, {safe:true}, function(err, result) {
        if (err) {
          console.log('Error updating question: ' + err);
          res.send({'error':'An error has occurred'});
        } else {
          console.log('' + result + ' document(s) updated');
          res.send(question);
        }
      });
    });
  });
};

exports.deleteQuestion = function(req, res) {
  var questionID = req.params.id;
  console.log('Deleting question: ' + questionID);
  db.collection('questions', function(err, collection) {
   db.collection('rooms', function(err, rooms) {
    rooms.update({room:{question:new BSON.ObjectID(questionID)}}, {$pull:{room:{question:new BSON.ObjectID(questionID)}}});
    collection.remove({_id:new BSON.ObjectID(questionID)}, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
    // db.collection('answers', function(err, collection) {
    //   collection.remove({'question':new BSON.ObjectID(id)});
    });
 });
};