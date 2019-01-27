'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _users = require('../../models/v1/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _getAllUsers = _users2.default.getAllUsers,
    _getSpecificUser = _users2.default.getSpecificUser,
    _deleteAllUsers = _users2.default.deleteAllUsers,
    _deleteSpecificUser = _users2.default.deleteSpecificUser;

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      _getAllUsers().then(function (users) {
        if (users.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all Users',
            data: users.rows
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'No User is available'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: 'getSpecificUser',
    value: function getSpecificUser(req, res) {
      var userId = req.params.userId;

      _getSpecificUser(userId).then(function (user) {
        if (user.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved specific user',
            data: user.rows[0]
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'User not found',
          error: true
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: 'deleteAllUsers',
    value: function deleteAllUsers(req, res) {
      _deleteAllUsers().then(function (users) {
        if (users.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully deleted users',
            data: users.rows
          });
        }
        return res.status(409).json({
          status: 409,
          message: 'No user found'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: 'deleteSpecificUser',
    value: function deleteSpecificUser(req, res) {
      var userId = req.params.userId;

      _deleteSpecificUser(userId).then(function (user) {
        if (user.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully deleted user'
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'User not found'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;