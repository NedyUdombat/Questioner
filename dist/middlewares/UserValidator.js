'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserValidator = function () {
  function UserValidator() {
    _classCallCheck(this, UserValidator);
  }

  _createClass(UserValidator, null, [{
    key: 'userValidator',
    value: function userValidator(req, res, next) {
      var user = req.body.user;

      if (user === '' || typeof user !== 'string') {
        return res.status(400).json({
          status: 400,
          message: 'User is cannot be empty and must be a string'
        });
      }
      return next();
    }
  }]);

  return UserValidator;
}();

exports.default = UserValidator;