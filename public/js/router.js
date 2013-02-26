IQ.Router.map(function() {
  this.resource('rooms', function() {
    this.resource('room', {path:':path_id'}, function() {
      this.resource('questions', function() {
        this.resource('question', {path:':question_id'}, function() {
          this.resource('answers', function() {
            this.resource('answer', {path:':answer_id'}, function() {
            })
          })
        })
      })
    })
  })
})


IQ.ApplicationRoute = Ember.Route.extend({

});

IQ.IndexRoute = Ember.Route.extend({

});

IQ.Rooms = Ember.Route.extend({
  model: function() {
    return IQ.Room.find();
  }
})
IQ.Room = Ember.Route.extend({
  
})
IQ.Questions = Ember.Route.extend({
  model: function() {
    return IQ.Question.find();
  }
})
IQ.Question = Ember.Route.extend({
  
})
IQ.Answers = Ember.Route.extend({
  model: function() {
    return IQ.Answer.find();
  }
})
IQ.Answer = Ember.Route.extend({
  
})