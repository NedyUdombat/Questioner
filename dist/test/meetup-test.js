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
  describe('POST /', function () {
    /*
    ** Testing Meetup Creation
    */
    it('/api/v1/meetups should respond with status code 201 and create a meetup', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups').set('x-access-token', authTokenAdmin).send(validMeetup).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Meetup creation successful');
        done();
      });
    });

    it('/api/v1/meetups should respond with status code 400 if date is in the past', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups').set('x-access-token', authTokenAdmin).send(invalidPastMeetup).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('/api/v1/meetups should respond with status code 400 if any field is empty or has the wrong data type', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups').set('x-access-token', authTokenAdmin).send(emptyFieldMeetup).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    /*
    ** Testing Meetup rsvp
    */

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 200 and rsvp for an upcoming meetup', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups/1/rsvp').set('x-access-token', authToken).send(validRsvp).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Rsvp meetup successful');
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 400 if status is not yes, no or maybe', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups/1/rsvp').set('x-access-token', authToken).send(invalidRsvp).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 404 if meetup does not exist', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups/18/rsvps').set('x-access-token', authToken).send(validRsvp).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('GET /', function () {
    it('/api/v1/meetups should respond with status code 200 and retrieve all meetups', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all meetups');
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 200 and retrieve specific meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetup/1').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved specific meetup');
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 404 when meetup is not available', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetup/100').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 400 when Id is not a number', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetup/u').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
});