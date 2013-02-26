IQ.ShowController = Ember.ArrayController.extend({
  tildenos: function() {
    console.log(this);
    return this.filterProperty('company.id', 'tilde').get('length');
  }.property('@each.company.name')
});