IQ.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

IQ.IndexView = Ember.View.extend({
  templateName: 'index'
});

/////////////////////////////////////////////
// Views for Models
/////////////////////////////////////////////

IQ.RoomsView = Ember.View.extend({
  templateName: 'rooms'
});

IQ.RoomView = Ember.View.extend({
  templateName: 'room'
});

IQ.QuestionsView = Ember.View.extend({
  templateName: 'questions'
});

IQ.QuestionView = Ember.View.extend({
  templateName: 'question'
});

IQ.AnswersView = Ember.View.extend({
  templateName: 'answers'
});

IQ.AnswerView = Ember.View.extend({
  templateName: 'answer'
});


/////////////////////////////////////////////
// Nav Bar View
/////////////////////////////////////////////

IQ.NavBarView = Ember.ContainerView.extend({
  tagName: 'div',
  classNames: ['navbar'],
  childViews: ['childView'],
  childView: Ember.ContainerView.extend({
    tagName: 'div',
    classNames: ['navbar-inner'],
    childViews: ['childView'],
    childView: Ember.View.extend({
      tagName: 'div',
      classNames: ['container'],
      template: Ember.Handlebars.compile([
        '<a class="btn btn-navbar collapsed" data-toggle="collapse" data-target=".navbar-responsive-collapse">',
          '<span class="icon-bar"></span>',
          '<span class="icon-bar"></span>',
          '<span class="icon-bar"></span>',
        '</a>',
        '<a class="brand" href="#">instantQuery</a>',
        '<div class="nav-collapse navbar-responsive-collapse collapse" style="height: 0px;">',
          '<ul class="nav">',
            '<li>{{#linkTo "rooms" }}Rooms{{/linkTo}}</li>',
            '<li>{{#linkTo "rooms.create" }}Create A Room{{/linkTo}}</li>',
          '</ul>',
        '</div><!-- /.nav-collapse -->',
      ].join('\n'))
    })
  })
});

/////////////////////////////////////////////
// Creation Views
/////////////////////////////////////////////

IQ.RoomCreateView = Ember.View.extend({
  tagName: 'div',
  classNames: [],
  template: Ember.Handlebars.compile([
    '<form>',
      '<fieldset>',
        '<legend>Create Room</legend>',
        '<label>Room Title</label>',
        '{{view Ember.TextField placeholder="title" valueBinding="view.title"}}',
        '<span class="help-block">Please use appropriate titles</span>',
        '<button class=\'btn\' {{action createRoom content target="view"}}>Submit</button>',
      '</fieldset>',
    '</form>'
  ].join('\n')),

  // this event is invoked in the {{action createRoom}}
  createRoom: function(event) {
    debugger;
  }
});

IQ.QuestionCreateView = Ember.View.extend({
  tagName: 'div',
  classNams: [],
  template: Ember.Handlebars.compile([
    '<form>',
      '<fieldset>',
        '<legend>Create Question</legend>',
        '<label>Question Title</label>',
        '{{view Ember.TextField placeholder="title" valueBinding="view.title"}}',
        '<label>Question Content</label>',
        '{{view Ember.TextArea placeholder="title" valueBinding="view.content"}}',
        '<span class="help-block"></span>',
        '<button class=\'btn\' {{action createQuestion content target="view"}}>Submit</button>',
      '</fieldset>',
    '</form>'
  ].join('\n')),

  // this event is invoked in the {{action createQuestion}}
  createQuestion: function(event) {
    debugger;
  }
});

IQ.AnswerCreateView = Ember.View.extend({
  tagName: 'div',
  classNams: [],
  template: Ember.Handlebars.compile([
    '<form>',
      '<fieldset>',
        '<legend>Reply to {Question}</legend>',
        '<label>Answer Content</label>',
        '{{view Ember.TextArea placeholder="title" valueBinding="view.content"}}',
        '<span class="help-block"></span>',
        '<button class=\'btn\' {{action createAnswer content target="view"}}>Submit</button>',
      '</fieldset>',
    '</form>'
  ].join('\n')),

  // this event is invoked in the {{action createAnswer}}
  createAnswer: function(event) {
    debugger;
  }
});
