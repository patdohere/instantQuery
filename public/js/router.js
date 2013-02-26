IQ.Router.map(function() {
  this.route("index");
  this.route("show");
})

IQ.ApplicationRoute = Ember.Route.extend({

});

IQ.IndexRoute = Ember.Route.extend({

});

IQ.ShowRoute = Ember.Route.extend({
  model: function() {
    return IQ.Person.find();
  }
});