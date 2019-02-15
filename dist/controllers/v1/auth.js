'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _user = require('../../models/v1/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var secretHash = process.env.SECRET_KEY;

var _createAccount = _user2.default.createAccount;

var AuthController = function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: 'createAccount',
    value: function createAccount(req, res) {
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          othername = _req$body.othername,
          username = _req$body.username,
          email = _req$body.email,
          password = _req$body.password,
          phonenumber = _req$body.phonenumber;

      var hash = _bcryptjs2.default.hashSync(password, 10);
      var userDetails = {
        firstname: firstname, lastname: lastname, othername: othername, username: username, email: email, password: hash, phonenumber: phonenumber
      };
      _createAccount(userDetails).then(function (results) {
        var returnedUserDetails = results.rows[0];
        var id = returnedUserDetails.id,
            role = returnedUserDetails.role;

        var authDetail = { id: id, username: username, email: email, role: role };
        var jwToken = _jsonwebtoken2.default.sign(authDetail, secretHash, { expiresIn: '24hr' });

        return res.status(201).json({
          status: 201,
          message: 'Account created',
          data: {
            id: results.rows[0].id,
            fullname: results.rows[0].firstname + ' ' + results.rows[0].othername + ' ' + results.rows[0].lastname,
            username: results.rows[0].username,
            email: results.rows[0].email,
            phonenumber: results.rows[0].phonenumber,
            registered: results.rows[0].registered,
            jwToken: jwToken,
            authDetail: authDetail
          }
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: 'login',
    value: function login(req, res) {
      var authDetail = {
        id: req.user.id, username: req.user.username, email: req.user.email, role: req.user.role
      };

      var jwToken = _jsonwebtoken2.default.sign(authDetail, secretHash, { expiresIn: '24hr' });

      return res.status(200).json({
        status: 200,
        message: 'Successfully logged in',
        jwToken: jwToken,
        authDetail: authDetail
      });
    }
  }, {
    key: 'logout',
    value: function logout(req, res) {
      return res.status(200).json({
        status: 200,
        auth: false,
        token: null
      });
    }
  }]);

  return AuthController;
}();

exports.default = AuthController;