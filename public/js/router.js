IQ.Router.map(function() {
  this.resource('rooms', function() {
    this.route('create', {path:'create'});
    this.resource('room', {path:'/:room_id'}, function() {
      
      // this.resource('questions', function() {

        this.route('create', {path:'create'});
        this.resource('question', {path:'/:question_id'}, function() {
          this.resource('answers', function() {

            this.route('create', {path:'create'});
            this.resource('answer', {path:'/:answer_id'}, function() {
            });
          });
        });
      // });
    });
  });
});

/////////////////////////////////////////////
// Application Routes
// main, index
/////////////////////////////////////////////

IQ.ApplicationRoute = Ember.Route.extend({

});

IQ.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('rooms');
  }
});

IQ.RoomsRoute = Ember.Route.extend({
  model: function(){
    return IQ.Room.find();
  }
});

IQ.RoomsIndexRoute = Ember.Route.extend({
  model: function() {
    return IQ.Room.find();
  }
});

IQ.RoomCreateRoute = Ember.Route.extend({

});

IQ.RoomRoute = Ember.Route.extend({
  model: function(params) {
    return IQ.Room.find(params.room_id);
  }
});

/////////////////////////////////////////////
// Questions Routes
// main, index, create, question_id
/////////////////////////////////////////////

// IQ.QuestionsRoute = Ember.Route.extend({
//   redirect: function() {
//     this.transitionTo('questions.index')
//   },

//   model: function() {
//     return IQ.Question.find();
//   }
// });

// IQ.QuestionsIndexRoute = Ember.Route.extend({
//   model: function() {
//     return IQ.Question.find();
//   }
// });

IQ.QuestionCreateRoute = Ember.Route.extend({

})

IQ.QuestionRoute = Ember.Route.extend({
  model: function(params) {
    return IQ.Room.find(params.question_id);
  }
});

/////////////////////////////////////////////
// Answers Routes
// main, index, create, answer_id
/////////////////////////////////////////////

IQ.AnswersRoute = Ember.Route.extend({
  model: function() {
    return IQ.Answer.find();
  }
});

IQ.AnswersIndexRoute = Ember.Route.extend({

});

IQ.AnswerCreateRoute = Ember.Route.extend({

})

IQ.AnswerRoute = Ember.Route.extend({
  model: function(params) {
    return IQ.Room.find(params.answer_id);
  }
});