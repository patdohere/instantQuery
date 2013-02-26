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
            '<li>{{#linkTo "rooms.create" }}Create a Room{{/linkTo}}</li>',
          '</ul>',
          '<ul class="nav pull-right">',
              '{{#if IQ.session}}',
                '<li class="dropdown">',
                  '<a class="dropdown-toggle" data-toggle="dropdown">',
                      '<img src="{{IQ.session.imgURL}}?type=small" width="18" height="18">',
                      '{{IQ.session.name}}',
                  '</a>',
                  '<li {{action logout target="IQ"}}><a>Logout</a></li>',
                '</li>',
              '{{else}}',
                '<li {{action login target="IQ"}}><a>Login</a></li>',
              '{{/if}}',
            '</ul>',
        '</div><!-- /.nav-collapse -->'
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
        '<legend>Create a Room</legend>',
        '<label>Room Title</label>',
        '{{view Ember.TextField placeholder="title" valueBinding="view.title"}}',
        '<span class="help-block">Please use appropriate titles</span>',
        '<button class=\'btn\' {{action createRoom content target="view"}}>Submit</button>',
      '</fieldset>',
    '</form>'
  ].join('\n')),

  // this event is invoked in the {{action createRoom}}
  createRoom: function(event) {
    // input validation

    // send data to store and store id of created item
    var id = this.get('controller').createRoom({
      title: this.get('title')
    });

    IQ.Router.router.handleURL('/rooms/');
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
        '<button class=\'btn\' {{action createQuestion this target="view"}}>Submit</button>',
      '</fieldset>',
    '</form>'
  ].join('\n')),

  // this event is invoked in the {{action createQuestion}}
  createQuestion: function(event) { 

    var roomID = this.get('parentView').get('parentView').get('controller').get('content').get('id');


    var id = this.get('controller').createQuestion({
      title: this.get('title'),
      content: this.get('content'),
      dateCreated: new Date().toJSON(),
      voteCount: 0
    });

    var route = '/rooms/' + roomID;

    IQ.Router.router.handleURL(route);
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
     var answer = IQ.Amswer.createRecord({title: this.get('content')});
  }
});
