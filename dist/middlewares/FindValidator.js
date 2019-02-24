'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _question = require('../models/v1/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getSpecificQuestion = _question2.default.getSpecificQuestion;

var FindValidator = function () {
  function FindValidator() {
    _classCallCheck(this, FindValidator);
  }

  _createClass(FindValidator, null, [{
    key: 'verifyQuestionId',
    value: function verifyQuestionId(req, res, next) {
      var questionId = req.params.questionId;

      getSpecificQuestion(questionId).then(function (results) {
        if (results.rowCount === 0) {
          return res.status(404).json({
            status: 404,
            message: 'Question does not exist',
            error: true
          });
        }
        return next();
      });
    }
  }]);

  return FindValidator;
}();

exports.default = FindValidator;