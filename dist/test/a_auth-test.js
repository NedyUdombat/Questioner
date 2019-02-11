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
var validUserAccount = _mockData.userAccounts.validUserAccount,
    validAdminAccount = _mockData.userAccounts.validAdminAccount,
    nonExistentUser = _mockData.userAccounts.nonExistentUser,
    invalidUserAccount = _mockData.userAccounts.invalidUserAccount,
    wrongPassword = _mockData.userAccounts.wrongPassword,
    emptyLoginCredentials = _mockData.userAccounts.emptyLoginCredentials;


describe('Questioner Server', function () {
  describe('POST /', function () {
    /*
    ** Testing Account Creation
    */
    it('/api/v1/auth/signup should respond with status code 201 and create a user account', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set('Accept', 'application/json').send(validUserAccount).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Account created');
        done();
      });
    });

    it('/api/v1/auth/signup should respond with status code 409 if account already exists', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set('Accept', 'application/json').send(validUserAccount).end(function (err, res) {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.eql('Credentials already in use');
        done();
      });
    });

    it('/api/v1/auth/signup should respond with status code 400 if any fiels=ds is empty or off wrong data type', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set('Accept', 'application/json').send(invalidUserAccount).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });

    /*
    ** Testing Account Login
    */

    // it('/api/v1/auth/login should respond with status code 404 if user does not exist', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/auth/login')
    //     .set('Accept', 'application/json')
    //     .send(nonExistentUser)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(404);
    //       expect(res.body).to.be.a('object');
    //       expect(res.body.message).eql('User does not exist');
    //       done();
    //     });
    // });

    it('/api/v1/auth/login should respond with status code 401 if password is incorrect', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/login').set('Accept', 'application/json').send(wrongPassword).end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Wrong Password');
        done();
      });
    });

    it('/api/v1/auth/login should respond with status code 200 and log a user in', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/login').set('Accept', 'application/json').send(validUserAccount).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
    });

    it('/api/v1/auth/login should respond with status code 400 if field is empty or incorrect', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/login').set('Accept', 'application/json').send(emptyLoginCredentials).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
    /*
    ** Testing Account Logout
    */

    it('/api/v1/auth/logout should respond with status code 200 and log user out', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/auth/logout').set('Accept', 'application/json').send(validAdminAccount).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.auth).eql(false);
        expect(res.body.token).eql(null);
        done();
      });
    });
  });
});