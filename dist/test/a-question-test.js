'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _mockData = require('./mocks/mockData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config chai to use expect
_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;

// deconstructure all mock data

var validQuestion = _mockData.mockQuestionDetails.validQuestion,
    invalidUserQuestion = _mockData.mockQuestionDetails.invalidUserQuestion,
    invalidMeetupQuestion = _mockData.mockQuestionDetails.invalidMeetupQuestion,
    invalidFieldQuestion = _mockData.mockQuestionDetails.invalidFieldQuestion;
var validVoter = _mockData.mockVoteDetails.validVoter,
    invalidVoter = _mockData.mockVoteDetails.invalidVoter,
    invalidVoterDataType = _mockData.mockVoteDetails.invalidVoterDataType;


describe('Questioner Server', function () {
  describe('POST /', function () {
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
});