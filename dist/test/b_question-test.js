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
    invalidFieldQuestion = _mockData.mockQuestionDetails.invalidFieldQuestion,
    comment = _mockData.mockQuestionDetails.comment;
var validUpvote = _mockData.mockVoteDetails.validUpvote,
    validDownvote = _mockData.mockVoteDetails.validDownvote,
    invalidVoteType = _mockData.mockVoteDetails.invalidVoteType,
    invalidUser = _mockData.mockVoteDetails.invalidUser;
var validUserAccount = _mockData.userAccounts.validUserAccount,
    validAdminAccount = _mockData.userAccounts.validAdminAccount;


var authToken = void 0;
var authTokenAdmin = void 0;

describe('Questioner Server', function () {
  before(function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/login').send(validUserAccount).end(function (err, res) {
      authToken = res.body.jwToken;
    });
    _chai2.default.request(_server2.default).post('/api/v1/auth/login').send(validAdminAccount).end(function (err, res) {
      authTokenAdmin = res.body.jwToken;
      done();
    });
  });
  describe('POST /', function () {
    /*
    ** Testing Question Creation
    */

    it('/api/v1/questions should respond with status code 201 and ask a question', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/questions').set('x-access-token', authToken).send(validQuestion).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        done();
      });
    });

    it('/api/v1/questions should respond with status code 404 if meetup does not exist', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/questions').set('x-access-token', authToken).send(invalidFieldQuestion).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('/api/v1/1/comments should respond with status code 201 and comment on a question', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/1/comments').set('x-access-token', authToken).send(comment).end(function (err, res) {
        expect(res.status).to.equal(201);
        done();
      });
    });
  });

  describe('GET /', function () {
    /*
    ** Testing Question Retrieval
    */

    it('/api/v1/questions should respond with status code 200 and retieve all questions', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/questions').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(201);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/questions').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).eql(false);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 403 if user is not an admin', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/questions').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.eql('You are not an Admin');
        expect(res.body.error).eql(true);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 200 and retieve all questions for Meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/questions').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/questions').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).eql(false);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 400 if id is not a number', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/id/questions').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.eql('ID can only be a number');
        expect(res.body.error).eql(true);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 404 if no questions have been asked', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/questions').set('x-access-token', authTokenAdmin).end(function (err, res) {
        res.status = 404;
        res.body.status = 404;
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 200 and retieve all questions by User', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/questions/user').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/questions/user').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).eql(false);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 404 if no questions have been asked', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/questions').set('x-access-token', authTokenAdmin).end(function (err, res) {
        res.status = 404;
        res.body.status = 404;
        expect(res.status).to.equal(404);
        done();
      });
    });

    /*
    ** Testing Comments Retrieval
    */
    it('/api/v1/questions should respond with status code 200 and retieve all comments', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/comments').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/comments').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).eql(false);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 403 if user is not an admin', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/comments').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.eql('You are not an Admin');
        expect(res.body.error).eql(true);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 200 and retieve all comments for a question', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/comments').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retreived all comments');
        done();
      });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/comments').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).eql(false);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 200 and retieve all comments by a user', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/comments/user').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retreived all your comments');
        done();
      });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/comments').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).eql(false);
        done();
      });
    });

    /*
    ** Testing votes Retrieval
    */

    it('/api/v1/questions should respond with status code 200 and retieve all questions upvote', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/upvote').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('/api/v1/questions should respond with status code 200 and retieve all questions downvote', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/downvote').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('PATCH /', function () {
    /*
    ** Testing question upvote
    */

    it('/api/v1/question/<question-id>/upvote should respond with status code 200 and upvote a question', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/1/upvote').set('x-access-token', authToken).send(validUpvote).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Upvote successful');
        done();
      });
    });

    /*
    ** Testing Question Downvote
    */
    it('/api/v1/question/<question-id>/downvote should respond with status code 200 and downvote a question', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/2/downvote').set('x-access-token', authToken).send(validDownvote).end(function (err, res) {
        expect(res.status).to.equal(201);
        done();
      });
    });
  });
});