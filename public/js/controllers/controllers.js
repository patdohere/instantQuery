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
  createRoom: function( title ) {
    var x = IQ.Room.createRecord({title: title});
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
  }.property('content')
});

/////////////////////////////////////////////
// Questions Controllers
// index, create, question_id
/////////////////////////////////////////////

// IQ.QuestionsController = Ember.ArrayController.extend();
// IQ.QuestionsIndexController = Ember.Controller.extend();
// IQ.QuestionsCreateController = Ember.ObjectController.extend();

IQ.QuestionController = Ember.ObjectController.extend({

});

/////////////////////////////////////////////
// Answers Controllers
// index, create, answer_id
/////////////////////////////////////////////

IQ.AnswersController = Ember.ArrayController.extend({

});

IQ.AnswersIndexController = Ember.Controller.extend({

});

IQ.AnswersCreateController = Ember.ObjectController.extend({

});

IQ.AnswerController = Ember.ObjectController.extend({

});