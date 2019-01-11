'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _meetups = require('../models/v1/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

var _mockData = require('./mocks/mockData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config chai to use expect
_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;

// deconstructure all mock data

var validMeetup = _mockData.mockMeetupDetails.validMeetup,
    emptyFieldMeetup = _mockData.mockMeetupDetails.emptyFieldMeetup,
    nonAdminMeetup = _mockData.mockMeetupDetails.nonAdminMeetup;
var validRsvp = _mockData.mockRSVPDetails.validRsvp,
    invalidRsvp = _mockData.mockRSVPDetails.invalidRsvp;


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

    it('/api/v1/meetups should respond with status code 401 if user is not an admin', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups').set('Accept', 'application/json').send(nonAdminMeetup).end(function (err, res) {
        expect(res.status).to.equal(403);
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

  describe('GET /', function () {
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

    it('/api/v1/meetups/<meetup-id> should respond with status code 400 when Id is not a number', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetup/u').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('/api/v1/meetups/upcoming should respond with status code 200 and retrieve all upcoming meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups/upcoming').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all upcoming meetups');
        done();
      });
    });

    it('/api/v1/meetups should respond with status code 404 when there are no meetups', function (done) {
      _meetups2.default.splice(0, 7);
      _chai2.default.request(_server2.default).get('/api/v1/meetups').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('/api/v1/meetups/upcoming should respond with status code 404 when there are no upcoming meetups', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups/upcoming').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.eql('There are no upcoming meetups');
        done();
      });
    });
  });
});