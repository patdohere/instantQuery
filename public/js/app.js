IQ = Ember.Application.create({
  VERSION: '0.0.1'
})

IQ.Router.map(function() {
  this.route("index");
  this.route("show");
})

IQ.ShowController = Ember.ArrayController.extend({
  tildenos: function() {
    console.log(this);
    return this.filterProperty('company.id', 'tilde').get('length');
  }.property('@each.company.name')
});

IQ.ShowRoute = Ember.Route.extend({
  model: function() {
    return IQ.Person.find();
  }
});

IQ.ShowView = Ember.View.extend({
  mouseUp: function(evt) {
    console.log("you clicked");
  }
});

IQ.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

IQ.Person = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),

  company: DS.belongsTo('IQ.Company'),

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});

IQ.Company = DS.Model.extend({
  name: DS.attr('string'),
  employees: DS.hasMany('IQ.Person')
})

IQ.Person.FIXTURES = [
  {
    id: "yehuda",
    firstName: "yehuda",
    lastName: "kats",
    company: "tilde"
  },
  {
    id: "tom",
    firstName: "tom",
    lastName: "dale",
    company: "tilde"
  },
  {
    id: "luke",
    firstName: "luke",
    lastName: "felix",
    company: "starbucks"
  },
]

IQ.Company.FIXTURES = [
  {
    id: 'tilde',
    name: 'tidle inc',
    employees: [
      'yehuda', 'tom'
    ]
  },
  {
    id: 'starbucks',
    name: 'starbucks coffee',
    employees: [
      'luke'
    ]
  }
]