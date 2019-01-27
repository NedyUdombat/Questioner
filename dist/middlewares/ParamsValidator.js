'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParamsValidator = function () {
  function ParamsValidator() {
    _classCallCheck(this, ParamsValidator);
  }

  _createClass(ParamsValidator, null, [{
    key: 'idValidator',
    value: function idValidator(req, res, next) {
      var _req$params = req.params,
          meetupId = _req$params.meetupId,
          questionId = _req$params.questionId,
          userId = _req$params.userId;

      var validId = /^[0-9]+$/;
      // validate if id is valid
      var validateParam = function validateParam(param) {
        if (!param.match(validId)) {
          return res.status(400).json({
            status: 400,
            message: 'ID can only be a number',
            error: true
          });
        }
        return next();
      };
      if (meetupId) validateParam(meetupId);
      if (userId) validateParam(userId);
      if (questionId) validateParam(questionId);
    }
  }]);

  return ParamsValidator;
}();

exports.default = ParamsValidator;