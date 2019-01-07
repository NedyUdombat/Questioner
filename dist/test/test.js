'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _dummyMeetups = require('../dummy/dummyModel/dummyMeetups');

var _dummyMeetups2 = _interopRequireDefault(_dummyMeetups);

var _mockData = require('./mocks/mockData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config chai to use expect
_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;

// deconstructure all mock data

var validMeetup = _mockData.mockMeetupDetails.validMeetup,
    emptyFieldMeetup = _mockData.mockMeetupDetails.emptyFieldMeetup,
    nonAdminMeetup = _mockData.mockMeetupDetails.nonAdminMeetup;
var validQuestion = _mockData.mockQuestionDetails.validQuestion,
    invalidUserQuestion = _mockData.mockQuestionDetails.invalidUserQuestion,
    invalidMeetupQuestion = _mockData.mockQuestionDetails.invalidMeetupQuestion,
    invalidFieldQuestion = _mockData.mockQuestionDetails.invalidFieldQuestion;
var validRsvp = _mockData.mockRSVPDetails.validRsvp,
    invalidRsvp = _mockData.mockRSVPDetails.invalidRsvp;
var validVoter = _mockData.mockVoteDetails.validVoter,
    invalidVoter = _mockData.mockVoteDetails.invalidVoter,
    invalidVoterDataType = _mockData.mockVoteDetails.invalidVoterDataType;


describe('Questioner Server', function () {
  describe('POST /', function () {
    /*
    ** Testing Meetup Creation
    */
    it('/api/v1/meetups should respond with status code 201 and create a meetup', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups').set('Accept', 'application/json').send(validMeetup).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Meetup successfully created');
        done();
      });
    });

    it('/api/v1/meetups should respond with status code 409 if meetup already exists', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups').set('Accept', 'application/json').send(validMeetup).end(function (err, res) {
        expect(res.status).to.equal(409);
        done();
      });
    });

    it('/api/v1/meetups should respond with status code 401 if user is not an admin', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups').set('Accept', 'application/json').send(nonAdminMeetup).end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
    });

    it('/api/v1/meetups should respond with status code 400 if any field is empty or has the wrong data type', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups').set('Accept', 'application/json').send(emptyFieldMeetup).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    /*
    ** Testing Question Creation
    */

    it('/api/v1/questions should respond with status code 201 and ask a question', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/questions').set('Accept', 'application/json').send(validQuestion).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Question asked successfully');
        done();
      });
    });

    it('/api/v1/questions should respond with status code 409 if question already exists', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/questions').set('Accept', 'application/json').send(validQuestion).end(function (err, res) {
        expect(res.status).to.equal(409);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 404 if user does not exist', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/questions').set('Accept', 'application/json').send(invalidUserQuestion).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 404 if meetup does not exist', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/questions').set('Accept', 'application/json').send(invalidMeetupQuestion).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 404 if meetup does not exist', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/questions').set('Accept', 'application/json').send(invalidFieldQuestion).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    /*
    ** Testing Meetup rsvp
    */
    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 200 and rsvp for an upcoming meetup', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups/1/rsvps').set('Accept', 'application/json').send(validRsvp).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Rsvp meetup successful');
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 400 if status is not yes, no or maybe', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups/1/rsvps').set('Accept', 'application/json').send(invalidRsvp).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 404 if meetup does not exist', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups/18/rsvps').set('Accept', 'application/json').send(validRsvp).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('PATCH /', function () {
    /*
    ** Testing question upvote
    */

    it('/api/v1/question/<question-id>/upvote should respond with status code 200 and upvote a question', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/1/upvote').set('Accept', 'application/json').send(validVoter).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Upvote successful');
        done();
      });
    });

    it('/api/v1/question/<question-id>/upvote should respond with status code 409 if you have already upvoted a question', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/1/upvote').set('Accept', 'application/json').send(validVoter).end(function (err, res) {
        expect(res.status).to.equal(409);
        done();
      });
    });

    it('/api/v1/question/<question-id>/upvote should respond with status code 404 if the user doesnt exist(logged in or signed up)', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/1/upvote').set('Accept', 'application/json').send(invalidVoter).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('/api/v1/question/<question-id>/upvote should respond with status code 400 if the input is of the wrong data type', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/1/upvote').set('Accept', 'application/json').send(invalidVoterDataType).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    /*
    ** Testing Question Downvote
    */
    it('/api/v1/question/<question-id>/downvote should respond with status code 200 and downvote a question', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/2/downvote').set('Accept', 'application/json').send(validVoter).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('/api/v1/question/<question-id>/downvote should respond with status code 409 if you have already downvoted a question', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/2/downvote').set('Accept', 'application/json').send(validVoter).end(function (err, res) {
        expect(res.status).to.equal(409);
        done();
      });
    });

    it('/api/v1/question/<question-id>/downvote should respond with status code 404 if the user doesnt exist(logged in or signed up)', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/2/downvote').set('Accept', 'application/json').send(invalidVoter).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('/api/v1/question/<question-id>/downvote should respond with status code 400 if the input is of the wrong data type', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/2/downvote').set('Accept', 'application/json').send(invalidVoterDataType).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET /', function () {
    it('should respond with status code 200', function (done) {
      _chai2.default.request(_server2.default).get('/').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Hi there! Welcome to our Questioner api! Visit /api/v1 for the Version 1 of out api');
        done();
      });
    });

    it('should respond with status code 200 at /api/v1', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Hi there! Welcome to our Questioner api!');
        done();
      });
    });

    it('/api/v1/meetups should respond with status code 200 and retrieve all meetups', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all meetups');
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 200 and retrieve specific meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetup/2').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved specific meetup');
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 404 when meetup is not available', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetup/10').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('/api/v1/meetups/upcoming should respond with status code 20 and retrieve all upcoming meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups/upcoming').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all upcoming meetups');
        done();
      });
    });

    it('/api/v1/meetups should respond with status code 404 when there are no meetups', function (done) {
      _dummyMeetups2.default.splice(0, 7);
      _chai2.default.request(_server2.default).get('/api/v1/meetups').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});