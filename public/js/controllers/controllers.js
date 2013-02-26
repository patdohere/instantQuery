IQ.ApplicationController = Ember.Controller.extend({

});

/////////////////////////////////////////////
// Rooms Controllers
// index, create, room_id
/////////////////////////////////////////////

IQ.RoomsController = Ember.ArrayController.extend({})
  

IQ.RoomsIndexController = Ember.ArrayController.extend({

});

IQ.RoomsCreateController = Ember.ObjectController.extend({
  createRoom: function( room ) {
    var x = IQ.Room.createRecord(room);
    this.get('store').commit();

    return x.get('id');
  }
});

IQ.RoomController = Ember.ObjectController.extend({
  hasQuestions: function() {
    var questions = this.get('content').get('questions');

    if (questions.get('length') <= 0) {
      return false;
    } else {
      return true;
    }
  }.property('content'),
});

IQ.RoomCreateController = Ember.ObjectController.extend({
  needs: ['room'],
  sortProperties: ['voteCount'],
  sortAscending: false,

  createQuestion: function ( question ) {
    var x = this.get('controllers.room').get('model').get('questions').createRecord(question);
    // this.get('controllers.room').get('store').commit();

    return x.get('id');
  }
});

/////////////////////////////////////////////
// Questions Controllers
// index, create, question_id
/////////////////////////////////////////////

// IQ.QuestionsController = Ember.ArrayController.extend();
// IQ.QuestionsIndexController = Ember.Controller.extend();
// IQ.QuestionsCreateController = Ember.ObjectController.extend();

IQ.QuestionController = Ember.ObjectController.extend({
  needs: ['question'],
  sortProperties: ['voteCount'],
  sortAscending: false,

  createAnswer: function ( answer ) {
    var x = this.get('controllers.question').get('model').get('answers').createRecord(answer);
    // this.get('controllers.question').get('store').commit();

    return x.get('id');
  }
});

/////////////////////////////////////////////
// Answers Controllers
// index, create, answer_id
/////////////////////////////////////////////

IQ.AnswersController = Ember.ArrayController.extend({
  needs: ['question'],
  sortProperties: ['voteCount'],
  sortAscending: false
});

IQ.AnswersIndexController = Ember.Controller.extend({
  needs: ['question'],
  sortProperties: ['voteCount'],
  sortAscending: false
});

IQ.AnswersCreateController = Ember.ObjectController.extend({
  needs: ['question'],
  sortProperties: ['voteCount'],
  sortAscending: false,

  createAnswer: function ( answer ) {
    var x = this.get('controllers.question').get('model').get('answers').createRecord(answer);
    // this.get('controllers.question').get('store').commit();

    return x.get('id');
  }
});

IQ.AnswerController = Ember.ObjectController.extend({

});