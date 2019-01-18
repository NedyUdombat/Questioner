'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeetupValidator = function () {
  function MeetupValidator() {
    _classCallCheck(this, MeetupValidator);
  }

  _createClass(MeetupValidator, null, [{
    key: 'statusValidator',
    value: function statusValidator(req, res, next) {
      var status = req.body.status;

      status = status.toLowerCase();
      var rsvpStatus = status === 'yes' || status === 'no' || status === 'maybe';
      if (!rsvpStatus) {
        return res.status(400).json({
          error: 'Rsvp should be yes, no, or maybe'
        });
      }
      return next();
    }
  }]);

  return MeetupValidator;
}();

exports.default = MeetupValidator;