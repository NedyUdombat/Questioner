'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _post_validators = require('../_helpers/post_validators');

var _post_validators2 = _interopRequireDefault(_post_validators);

var _dbConfig = require('../database/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountValidator = function () {
  function AccountValidator() {
    _classCallCheck(this, AccountValidator);
  }

  _createClass(AccountValidator, null, [{
    key: 'createAccountInputValidator',
    value: function createAccountInputValidator(req, res, next) {
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          username = _req$body.username,
          email = _req$body.email,
          password = _req$body.password;


      var fields = { firstname: firstname, lastname: lastname, username: username, email: email, password: password };
      var fields2 = {
        othername: req.body.othername,
        phonenumber: req.body.phonenumber
      };
      var validator = new _post_validators2.default();
      validator.validate(fields, 'required|string');
      validator.validate(fields2, 'string');

      if (validator.hasErrors) {
        return res.status(400).json({
          errorMessages: validator.getErrors()
        });
      }
      return next();
    }
  }, {
    key: 'createAccountDuplicateValidator',
    value: function createAccountDuplicateValidator(req, res, next) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          username = _req$body2.username;

      _dbConfig2.default.query('SELECT email from users where email = \'' + email + '\'').then(function (foundEmail) {
        _dbConfig2.default.query('SELECT username from users where username = \'' + username + '\'').then(function (foundUsername) {
          if (foundEmail.rowCount === 0 && foundUsername.rowCount === 0) {
            return next();
          }
          res.status(409).json({
            status: 409,
            message: 'Credentials already in use',
            error: true });
        });
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    }
  }, {
    key: 'loginAccountValidator',
    value: function loginAccountValidator(req, res, next) {
      var _req$body3 = req.body,
          email = _req$body3.email,
          password = _req$body3.password;


      var fields = { email: email, password: password };
      var validator = new _post_validators2.default();
      validator.validate(fields, 'required|string');

      if (validator.hasErrors) {
        return res.status(400).json({
          errorMessages: validator.getErrors()
        });
      }
      _dbConfig2.default.query('SELECT * FROM users Where email = \'' + email + '\' ').then(function (user) {
        if (user.rowCount > 0) {
          if (_bcryptjs2.default.compareSync(password, user.rows[0].password) === false) {
            return res.status(401).json({
              status: 401,
              message: 'Wrong Password'
            });
          }
          req.user = user.rows[0];
          return next();
        }
        return res.status(404).json({ status: 404, message: 'User does not exist', error: true });
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    }
  }]);

  return AccountValidator;
}();

exports.default = AccountValidator;