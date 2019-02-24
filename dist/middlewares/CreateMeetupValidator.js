'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dbConfig = require('../database/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _post_validators = require('../_helpers/post_validators');

var _post_validators2 = _interopRequireDefault(_post_validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateMeetupValidator = function () {
  function CreateMeetupValidator() {
    _classCallCheck(this, CreateMeetupValidator);
  }

  _createClass(CreateMeetupValidator, null, [{
    key: 'createMeetupValidator',
    value: function createMeetupValidator(req, res, next) {
      var _req$body = req.body,
          organizerName = _req$body.organizerName,
          topic = _req$body.topic,
          happeningOn = _req$body.happeningOn,
          location = _req$body.location;


      var fields = {
        organizerName: organizerName, topic: topic, happeningOn: happeningOn, location: location
      };
      var validator = new _post_validators2.default();
      validator.validate(fields, 'required|string');

      if (validator.hasErrors) {
        return res.status(400).json({
          errorMessages: validator.getErrors()
        });
      }if ((0, _moment2.default)(happeningOn).isBefore(Date.now())) {
        return res.status(400).json({
          status: 400,
          message: 'You cannot create meetup in the past'
        });
      }
      return next();
    }
  }, {
    key: 'createMeetupDuplicateValidator',
    value: function createMeetupDuplicateValidator(req, res, next) {
      var meetupDetails = req.body;
      _dbConfig2.default.query('SELECT * from meetups where topic = \'' + meetupDetails.topic + '\' AND location = \'' + meetupDetails.location + '\' AND happening_on= \'' + meetupDetails.happeningOn + '\'').then(function (foundMeetup) {
        if (foundMeetup.rowCount > 0) {
          return res.status(409).json({
            status: 409,
            message: 'Meetup Already Exists',
            error: true
          });
        }
        return next();
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    }
  }]);

  return CreateMeetupValidator;
}();

exports.default = CreateMeetupValidator;