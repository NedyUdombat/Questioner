'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _post_validators = require('../_helpers/post_validators');

var _post_validators2 = _interopRequireDefault(_post_validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateQuestionValidator = function () {
  function CreateQuestionValidator() {
    _classCallCheck(this, CreateQuestionValidator);
  }

  _createClass(CreateQuestionValidator, null, [{
    key: 'createQuestionValidator',
    value: function createQuestionValidator(req, res, next) {
      var _req$body = req.body,
          title = _req$body.title,
          body = _req$body.body;


      var fields = {
        title: title,
        body: body
      };
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

  return CreateQuestionValidator;
}();

exports.default = CreateQuestionValidator;