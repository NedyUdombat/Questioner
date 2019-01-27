'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _rsvps = require('../../models/v1/rsvps');

var _rsvps2 = _interopRequireDefault(_rsvps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var secretHash = process.env.SECRET_KEY;

var _rsvpMeetup = _rsvps2.default.rsvpMeetup,
    _getAllRsvps = _rsvps2.default.getAllRsvps,
    _getAllRsvpsForMeetup = _rsvps2.default.getAllRsvpsForMeetup,
    _getAllRsvpsByUser = _rsvps2.default.getAllRsvpsByUser;

var RsvpController = function () {
  function RsvpController() {
    _classCallCheck(this, RsvpController);
  }

  _createClass(RsvpController, null, [{
    key: 'rsvpMeetup',
    value: function rsvpMeetup(req, res) {
      var id = req.params.meetupId;
      var jwToken = req.headers['x-access-token'];
      var userId = void 0;
      _jsonwebtoken2.default.verify(jwToken, secretHash, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        userId = decoded.id;
      });
      var rsvp = {
        userId: userId,
        status: req.body.status
      };
      _rsvpMeetup(rsvp, id).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Rsvp meetup successful',
            data: results.rows
          });
        }
        return res.status(400).json({
          status: 400,
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
      _getAllRsvps().then(function (results) {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all rsvps',
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
  }, {
    key: 'getAllRsvpsForMeetup',
    value: function getAllRsvpsForMeetup(req, res) {
      var meetupId = req.params.meetupId;

      _getAllRsvpsForMeetup(meetupId).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all rsvps for this meetup',
            data: results.rows
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'no rsvp has been made for this meetup'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: 'getAllRsvpsByUser',
    value: function getAllRsvpsByUser(req, res) {
      var userId = req.params.userId;

      _getAllRsvpsByUser(userId).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: results.rows
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'you have no rsvps'
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