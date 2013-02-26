IQ.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});



IQ.Room = DS.Model.extend({
  title: DS.attr('string')
});

IQ.Room.FIXTURES = [
{
  id: "1",
  title: 'Lorem'
}, {
  id: "2",
  title: "Ipsum"
}, {
  id: "3",
  title: "Dolor"
}];