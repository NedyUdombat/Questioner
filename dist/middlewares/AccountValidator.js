'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _post_validators = require('../_helpers/post_validators');

var _post_validators2 = _interopRequireDefault(_post_validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountValidator = function () {
  function AccountValidator() {
    _classCallCheck(this, AccountValidator);
  }

  _createClass(AccountValidator, null, [{
    key: 'createAccountValidator',
    value: function createAccountValidator(req, res, next) {
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
    key: 'loginAccountValidator',
    value: function loginAccountValidator(req, res, next) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;


      var fields = { email: email, password: password };
      var validator = new _post_validators2.default();
      validator.validate(fields, 'required|string');

      if (validator.hasErrors) {
        return res.status(400).json({
          errorMessages: validator.getErrors()
        });
      }

      return next();
    }
  }]);

  return AccountValidator;
}();

exports.default = AccountValidator;