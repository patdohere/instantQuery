var mongo = require('mongodb');

var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('appdb', server, {safe: true});

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'appdb' database");
    db.collection('rooms', {safe:true}, function(err, collection) {
      if (err) {
        console.log("The 'rooms' collection doesn't exist. Creating it with sample data...");
        populateDB();
      }
    });
  }
});


exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving room: ' + id);
  db.collection('rooms', function(err, collection) {
    collection.findOne({'_id': new BSON.ObjectID(id)}, {_id:0}, function(err, item) {
      res.send({rooms:item});
    });
  });
};

exports.findAll = function(req, res) {
  db.collection('rooms', function(err, collection) {
    collection.find({}, {_id:0}).toArray(function(err, items) {
      res.send({rooms:items});
    });
  });
};

exports.addRoom = function(req, res) {
  var room = req.body;
  console.log('Adding room: ' + JSON.stringify(room));
  db.collection('rooms', function(err, collection) {
    collection.insert(room, {safe:true}, function(err, result) {
      var temp = result[0]._id;
      var check = result[0].room.title;
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        delete result[0]._id;
        res.send(result[0]);
        result[0].room.id = temp;
        collection.update({room:{title: check}}, result[0].room, {upsert:true}, function(err, panda) {
          console.log(panda + " : Success");
        });
      }
    });
  });
};

exports.updateRoom = function(req, res) {
  var roomID = req.params.id;
  var newRoom = {room: req.body};
  delete newRoom.id;
  console.log('Updating room: ' + roomID);
  db.collection('rooms', function(err, collection) {
    collection.findOne({_id:new BSON.ObjectID(roomID)}, function(err, oldRoom) {
     newRoom.room.questions_id = oldRoom.room.questions_id;
     newRoom.room.id = oldRoom.room.id;
     collection.update({_id:new BSON.ObjectID(roomID)}, newRoom, {safe:true}, function(err, result) {
      if (err) {
        console.log('Error updating room: ' + err);
        res.send({'error':'An error has occurred'});
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(newRoom);
      }
    });
   });
  });
};

exports.deleteRoom = function(req, res) {
  var roomID = req.params.id;
  console.log('Deleting room: ' + roomID);
  db.collection('rooms', function(err, collection) {
    collection.remove({_id:new BSON.ObjectID(roomID)}, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
    db.collection('questions', function(err, collection) {
      collection.remove({'room_id':id});
    });
  });
};