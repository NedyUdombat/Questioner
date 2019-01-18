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

var _users = require('../../models/v1/users');

var _users2 = _interopRequireDefault(_users);

var _dbConfig = require('../../models/v1/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var secretHash = process.env.SECRET_KEY;

var _createAccount = _users2.default.createAccount;

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
      _dbConfig2.default.query('SELECT email from users where email = \'' + email + '\'').then(function (found) {
        if (found.rowCount === 0) {
          _createAccount(userDetails).then(function (results) {
            if (results.rowCount > 0) {
              return res.status(201).json({
                status: 201,
                message: 'Account created',
                data: results.rows
              });
            }
            return res.status(500).json({
              status: 500,
              error: 'Could not create account'
            });
          }).catch(function (error) {
            return res.status(400).json({
              status: 400,
              error: error.message
            });
          });
        } else {
          return res.status(409).json({
            tatus: 409,
            message: 'email is already in use, if that email belongs to you, kindly login',
            error: true });
        }
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    }
  }, {
    key: 'loginAccount',
    value: function loginAccount(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      _dbConfig2.default.query('SELECT * FROM users Where email = \'' + email + '\' ').then(function (user) {
        if (user.rowCount > 0) {
          var returnedUserDetails = user.rows[0];
          if (_bcryptjs2.default.compareSync(returnedUserDetails.password, password) === false) {
            var id = returnedUserDetails.id,
                name = returnedUserDetails.name,
                username = returnedUserDetails.username,
                role = returnedUserDetails.role;

            var authDetail = { id: id, name: name, username: username, email: email, role: role };

            var jwToken = _jsonwebtoken2.default.sign(authDetail, secretHash, { expiresIn: '100hr' });

            return res.status(200).json({
              status: 200,
              message: 'Successfully logged in',
              jwToken: jwToken,
              authDetail: authDetail
            });
          }
          return res.status(401).json({
            status: 401,
            failed: 'Wrong Password'
          });
        }
        return res.status(404).json({ status: 404, message: 'User does not exist', error: true });
      }).catch( /* istanbul ignore next */function (err) {
        return res.status(500).json(err);
      });
    }
  }]);

  return AuthController;
}();

exports.default = AuthController;