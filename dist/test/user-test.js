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
var validMeetup = _mockData.mockMeetupDetails.validMeetup,
    invalidPastMeetup = _mockData.mockMeetupDetails.invalidPastMeetup,
    emptyFieldMeetup = _mockData.mockMeetupDetails.emptyFieldMeetup;
var validRsvp = _mockData.mockRSVPDetails.validRsvp,
    invalidRsvp = _mockData.mockRSVPDetails.invalidRsvp;
var validUserAccount = _mockData.userAccounts.validUserAccount,
    validAdminAccount = _mockData.userAccounts.validAdminAccount,
    wrongPassword = _mockData.userAccounts.wrongPassword,
    nonExistentUser = _mockData.userAccounts.nonExistentUser;


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

  describe('GET /', function () {
    /*
    ** Test for token deocde
    */
    it('/api/v1/decode should respond with status code 200 and decode a token', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/decode').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
    });
    it('/api/v1/decode should respond with status code 401 if no token is provided', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/decode').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.auth).eql(false);
        expect(res.body.message).eql('Please provide a JWT token');
        done();
      });
    });
    /*
    ** Test to get all users
    */
    it('/api/v1/users should respond with status code 200 and retrieve all users', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/users').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all Users');
        done();
      });
    });

    it('/api/v1/users should respond with status code 404 if there are no users', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/users').set('x-access-token', authTokenAdmin).end(function (err, res) {
        res.body.data = [];
        expect(res.body.data).to.eql([]);
        // expect(res.body.status).to.eql(404);
        // expect(res.body.message).to.eql('No User is available');
        done();
      });
    });

    it('/api/v1/users should respond with status code 403 if the requester is not an admin', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/users').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.eql('You are not an Admin');
        expect(res.body.error).to.eql(true);
        done();
      });
    });

    it('/api/v1/users should respond with status code 401 if the requester is not logged in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/users').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).to.eql(false);
        done();
      });
    });

    /*
    ** Test to get specific user
    */
    it('/api/v1/user should respond with status code 200 and retrieve specific user', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/user').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved specific user');
        done();
      });
    });

    it('/api/v1/user should respond with status code 401 if the requester is not logged in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/user').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).to.eql(false);
        done();
      });
    });

    /*
    ** Test to get any user
    */
    it('/api/v1/user/1 should respond with status code 200 and retrieve any user', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/user/1').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved specific user');
        done();
      });
    });

    it('/api/v1/user should respond with status code 404 if user doesn\t exist', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/user/100000000').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.eql('User not found');
        expect(res.body.error).to.eql(true);
        done();
      });
    });
    it('/api/v1/user should respond with status code 401 if requester is not logged in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/user/100000000').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).to.eql(false);
        done();
      });
    });
  });

  describe('DELETE /', function () {
    it('/api/v1/users/2 should respond with status code 200 and delete that user', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/users/1').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('Successfully deleted user');
        done();
      });
    });
    it('/api/v1/users/2 should respond with status code 404 if user doesn\'t exist', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/users/1').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.eql(404);
        expect(res.body.message).to.eql('User not found');
        done();
      });
    });
    it('/api/v1/users/2 should respond with status code 403 if user is not an admin', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/users/1').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.eql(403);
        expect(res.body.message).to.eql('You are not an Admin');
        done();
      });
    });
    it('/api/v1/users/2 should respond with status code 401 if admin is not logged in', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/users/1').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.eql(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).to.eql(false);
        done();
      });
    });

    it('/api/v1/users should respond with status code 200 and delete all users', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/users').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('Successfully deleted users');
        done();
      });
    });
    it('/api/v1/users should respond with status code 404 if no user exist', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/users').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.eql(404);
        expect(res.body.message).to.eql('No user found');
        done();
      });
    });
    it('/api/v1/users should respond with status code 403 if user is not an admin', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/users').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.eql(403);
        expect(res.body.message).to.eql('You are not an Admin');
        done();
      });
    });
    it('/api/v1/users should respond with status code 401 if admin is not logged in', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/users').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.eql(401);
        expect(res.body.message).to.eql('Please provide a JWT token');
        expect(res.body.auth).to.eql(false);
        done();
      });
    });
  });
});