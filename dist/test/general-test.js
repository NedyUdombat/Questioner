'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config chai to use expect
_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;


describe('Questioner Server', function () {
  describe('GET /', function () {
    it('should respond with status code 200', function (done) {
      _chai2.default.request(_server2.default).get('/').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Hi there! Welcome to our Questioner api! Visit /api/v1 for the Version 1 of our api');
        done();
      });
    });

    it('should respond with status code 200 at /api/v1', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Hi there! Welcome to version 1 of Questioner API!');
        done();
      });
    });

    it('should respond with status code 404 at /api/v1 if page does not exist', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/y').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.eql('The page you are looking for does not exist');
        done();
      });
    });
  });
});