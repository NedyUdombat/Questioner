'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbConfig = require('../database/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _rsvps = require('../models/v1/rsvps');

var _rsvps2 = _interopRequireDefault(_rsvps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var changeRsvpMeetup = _rsvps2.default.changeRsvpMeetup;

var RsvpValidator = function () {
  function RsvpValidator() {
    _classCallCheck(this, RsvpValidator);
  }

  _createClass(RsvpValidator, null, [{
    key: 'rsvpDuplicateValidator',
    value: function rsvpDuplicateValidator(req, res, next) {
      var rsvp = {
        meetupId: req.params.meetupId,
        userId: req.authData.id
      };
      var newResponse = void 0;
      _dbConfig2.default.query('SELECT * from rsvps where meetup_id = ' + req.params.meetupId + ' AND user_id = ' + req.authData.id).then(function (foundrsvp) {
        if (foundrsvp.rowCount === 0) {
          next();
        } else if (foundrsvp.rows[0].response === 'yes') {
          newResponse = 'no';
          changeRsvpMeetup(rsvp, newResponse).then(function (results) {
            return res.status(201).json({
              status: 200,
              message: 'Meetup rsvp cancelled',
              data: results.rows[0]
            });
          }).catch(function (err) {
            return res.status(500).json(err);
          });
        } else {
          newResponse = 'yes';
          changeRsvpMeetup(rsvp, newResponse).then(function (results) {
            return res.status(201).json({
              status: 200,
              message: 'Meetup rsvp successful',
              data: results.rows[0]
            });
          }).catch(function (err) {
            return res.status(500).json(err);
          });
        }
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    }
  }]);

  return RsvpValidator;
}();

exports.default = RsvpValidator;