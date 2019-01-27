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

    it('/api/v1/me/etups/upcoming should respond with status code 200 and retrieve all upcoming meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups/upcoming').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all upcoming meetups');
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 200 and retrieve specific meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups/1').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved specific meetup');
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 404 when meetup is not available', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups/100').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 400 when Id is not a number', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups/u').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    /*
    ** testing get routes for rsvp
    */

    it('/api/v1/rsvps should respond with status code 200 and retrieve all rsvps', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/rsvps').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all rsvps');
        done();
      });
    });

    it('/api/v1/rsvps should respond with status code 404 when there are no rsvps', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/rsvps').set('x-access-token', authTokenAdmin).end(function (err, res) {
        res.body.data = [];
        expect(res.body.data).to.eql([]);
        done();
      });
    });

    it('/api/v1/rsvps should respond with status code 401 id user is not logged-in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/rsvps').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
    });

    it('/api/v1/rsvps should respond with status code 403 if user is not an admin', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/rsvps').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('/api/v1/<meetup-id>/rsvps should respond with status code 200 and retrieve all rsvps for a meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/rsvps').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('/api/v1/<meetup-id>/rsvps should respond with status code 404 if there is no rsvp for that meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/100000/rsvps').set('x-access-token', authTokenAdmin).end(function (err, res) {
        res.body.data = [];
        expect(res.status).to.eql(404);
        expect(res.body.data).to.eql([]);
        done();
      });
    });

    it('/api/v1/<meetup-id>/rsvps should respond with status code 401 id user is not logged-in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/2/rsvps').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
    });

    it('/api/v1/<meetup-id>/rsvps should respond with status code 403 if user is not an admin', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/1/rsvps').set('x-access-token', authToken).end(function (err, res) {
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('/api/v1/<user-id>/rsvps should respond with status code 200 and retrieve all rsvps by a user', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/rsvps/2').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('/api/v1/<user-id>/rsvps should respond with status code 404 if that user has no rsvps', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/rsvps/10000').set('x-access-token', authTokenAdmin).end(function (err, res) {
        res.body.data = [];
        expect(res.status).to.eql(404);
        expect(res.body.data).to.eql([]);
        done();
      });
    });

    it('/api/v1/<user-id>/rsvps should respond with status code 401 id user is not logged-in', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/rsvps/2').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
    });
  });

  describe('DELETE /', function () {
    it('/api/v1/meetups/1 should respond with status code 200 and delete that meetup', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/meetups/1').set('x-access-token', authTokenAdmin).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});