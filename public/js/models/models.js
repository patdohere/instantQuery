IQ.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

IQ.User = DS.Model.extend({
  userID: DS.attr('number'),
  username: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  
  name: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  imgURL: function() {
    return 'https://graph.facebook.com/'+ this.get('username') +'picture';
  }.property('username'),

  quesitons: DS.hasMany('IQ.Question')
});



/////////////////////////////////////////////
// Models
/////////////////////////////////////////////

IQ.Room = DS.Model.extend({
  title: DS.attr('string'),

  questions: DS.hasMany('IQ.Question')
});

IQ.Question = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  dateCreated: DS.attr('date'),
  dateEdited: DS.attr('date'),
  voteCount: DS.attr('number'),
  content: DS.attr('string'),

  humanDate: function() {
    var data = new Date(this.get('dateCreated'));
    var date = data.toLocaleDateString();
    var time = data.toLocaleTimeString();

    return date + ' ' + time;
  }.property('dateCreated'),

  answers: DS.hasMany('IQ.Answer'),
  room: DS.belongsTo('IQ.Room')
});

IQ.Answer = DS.Model.extend({
  author: DS.attr('string'),
  dateCreated: DS.attr('date'),
  voteCount: DS.attr('number'),
  content: DS.attr('string'),

  question: DS.belongsTo('IQ.Question')
});

IQ.User.FIXTURES = [
{
  fb: 123,
  name: "Patrick Do",
  imageURL: "http://placekitten.com/32/32"
}, {
  fb: 456,
  name: "Joseph Than",
  imageURL: "http://placekitten.com/g/32/32"
}];

/////////////////////////////////////////////
// Fixtures
/////////////////////////////////////////////

IQ.Room.FIXTURES = [
{
  id: 1,
  title: "ICS 60 : Games in Society",

  questions: [1, 3]
}, {
  id: 2,
  title: "ICS 31 : Intro to Programming",

  questions: [2, 4]
}];

IQ.Question.FIXTURES = [
{
  id: 1,
  title: "The issue with event.js:71.",
  author: "Joseph Than",
  dateCreated: "2013-02-26T03:11:02.434Z",
  dateEdited: "2013-02-26T03:11:02.434Z",
  voteCount: 9001,
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Statue sic fugiendus divitias multa concludaturque sophocles minuendas, appetendi ostendit instituendarum arbitramur delectari. Accuratius ceterorum forte aequi disputata saxum perspicuum consulatu utinam. Sermo inimicus ulla tribus alienus incorruptis efficiat itaque vim. Esset exorsus, dialectica invitat inter impeditur offendimur. Copulationes appellat fugiamus copulationesque quale, iudicante, eiusdem multos reformidans illae difficiles, pater, adamare latinas dissident medium atomis depulsa monstruosi. Vituperata solum delapsa spatio quin conversa gravitate senserit cognosci cum. Videor dissident iudicium compluribus rebus.",

  answers: [1,5,9],
  room: 1
}, {
  id: 2,
  title: "Clone of the Jedi",
  author: "Patrick Do",
  dateCreated: "2013-02-26T03:11:02.434Z",
  dateEdited: "2013-02-26T03:11:02.434Z",
  voteCount: 1009,
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provincias liberatione cognitioque atomos ac, et mox frui laboramus gratia lineam. Credo adipisci labitur tamquam dices concupiscunt, nunc indoctis stultorum nutu docendi quasi. Dialectica detractio anteponant sollicitare expetendas, chrysippo procedat conetur detraxit soleat. Atqui suavitate collaudata incommoda arbitramur vulgo ponunt firme. Eitam iustitia gessisse quaerenda paulo mediocris significet pauca animumque adversa, coniunctione fugiamus apud habent varias eruditi grata pacto nocet, eloquentiam saxum conturbamur efficiantur soleat certissimam illum veritus vita meque, iucundo sensus.",

  answers: [2,6,10],
  room: 2
}, {
  id: 3,
  title: "Diablo 3",
  author: "Anni Liu",
  dateCreated: "2013-02-26T03:11:02.434Z",
  dateEdited: "2013-02-26T03:11:02.434Z",
  voteCount: 9001,
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Statue sic fugiendus divitias multa concludaturque sophocles minuendas, appetendi ostendit instituendarum arbitramur delectari. Accuratius ceterorum forte aequi disputata saxum perspicuum consulatu utinam. Sermo inimicus ulla tribus alienus incorruptis efficiat itaque vim. Esset exorsus, dialectica invitat inter impeditur offendimur. Copulationes appellat fugiamus copulationesque quale, iudicante, eiusdem multos reformidans illae difficiles, pater, adamare latinas dissident medium atomis depulsa monstruosi. Vituperata solum delapsa spatio quin conversa gravitate senserit cognosci cum. Videor dissident iudicium compluribus rebus.",

  answers: [3,7,11],
  room: 1
}, {
  id: 4,
  title: "Obsidian Entertainment",
  author: "Ari Such",
  dateCreated: "2013-02-26T03:11:02.434Z",
  dateEdited: "2013-02-26T03:11:02.434Z",
  voteCount: 9001,
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Statue sic fugiendus divitias multa concludaturque sophocles minuendas, appetendi ostendit instituendarum arbitramur delectari. Accuratius ceterorum forte aequi disputata saxum perspicuum consulatu utinam. Sermo inimicus ulla tribus alienus incorruptis efficiat itaque vim. Esset exorsus, dialectica invitat inter impeditur offendimur. Copulationes appellat fugiamus copulationesque quale, iudicante, eiusdem multos reformidans illae difficiles, pater, adamare latinas dissident medium atomis depulsa monstruosi. Vituperata solum delapsa spatio quin conversa gravitate senserit cognosci cum. Videor dissident iudicium compluribus rebus.",

  answers: [4,8,12],
  room: 2
}];

IQ.Answer.FIXTURES = [
{
	id: 1,
	author: '0',
	voteCount: 0,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 1
}, {
	id: 2,
	author: '1',
	voteCount: 1,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 2
}, {
	id: 3,
	author: '2',
	voteCount: 2,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 3
}, {
	id: 4,
	author: '3',
	voteCount: 3,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 4
}, {
	id: 5,
	author: '4',
	voteCount: 4,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 1
}, {
	id: 6,
	author: '5',
	voteCount: 5,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 2
}, {
	id: 7,
	author: '6',
	voteCount: 6,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 3
}, {
	id: 8,
	author: '7',
	voteCount: 7,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 4
}, {
	id: 9,
	author: '8',
	voteCount: 8,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 1
}, {
	id: 10,
	author: '8',
	voteCount: 9,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 2
}, {
	id: 11,
	author: '8',
	voteCount: 10,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 3
}, {
	id: 12,
	author: '9',
	voteCount: 11,
	dateCreated: "2013-02-26T03:11:02.434Z",
	content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",

	question: 4
}];
