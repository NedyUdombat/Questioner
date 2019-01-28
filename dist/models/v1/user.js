'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbConfig = require('../../database/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'getAllUsers',
    value: function getAllUsers() {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM users').then(function (results) {
          return resolve(results);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getSpecificUser',
    value: function getSpecificUser(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM users WHERE id = ' + id).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'createAccount',
    value: function createAccount(details) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('INSERT INTO users ( firstname, lastname, othername, username, email, password, phonenumber, role) VALUES (\'' + details.firstname + '\', \'' + details.lastname + '\',\'' + details.othername + '\', \'' + details.username + '\', \'' + details.email + '\', \'' + details.password + '\', \'' + details.phonenumber + '\', \'user\') returning *').then(function (results) {
          return resolve(results);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'deleteAllUsers',
    value: function deleteAllUsers() {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('DELETE FROM users').then(function (results) {
          return resolve(results);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'deleteSpecificUser',
    value: function deleteSpecificUser(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('DELETE FROM users WHERE id = ' + id).then(function (results) {
          return resolve(results);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return User;
}();

exports.default = User;