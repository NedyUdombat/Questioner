'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rsvps = require('../../models/v1/rsvps');

var _rsvps2 = _interopRequireDefault(_rsvps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _rsvpMeetup = _rsvps2.default.rsvpMeetup,
    _getAllRsvps = _rsvps2.default.getAllRsvps;

var RsvpController = function () {
  function RsvpController() {
    _classCallCheck(this, RsvpController);
  }

  _createClass(RsvpController, null, [{
    key: 'rsvpMeetup',
    value: function rsvpMeetup(req, res) {
      var id = req.params.meetupId;
      var userId = req.body.userId;
      var rsvp = {
        userId: userId,
        status: req.body.status
      };
      _rsvpMeetup(rsvp, id).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            data: results.rows
          });
        }
        return res.status(400).json({
          status: 404,
          error: 'Could not rsvp for meetup'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error
        });
      });
    }
  }, {
    key: 'getAllRsvps',
    value: function getAllRsvps(req, res) {
      var meetupId = req.params.meetupId;

      _getAllRsvps(meetupId).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: results.rows
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'no rsvp has been made'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }]);

  return RsvpController;
}();

exports.default = RsvpController;