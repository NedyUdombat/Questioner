'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _meetups = require('../../models/v1/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getAll = _meetups2.default.getAll,
    getSpecific = _meetups2.default.getSpecific,
    getUpcoming = _meetups2.default.getUpcoming,
    create = _meetups2.default.create;

var MeetupController = function () {
  function MeetupController() {
    _classCallCheck(this, MeetupController);
  }

  _createClass(MeetupController, null, [{
    key: 'getAllMeetups',
    value: function getAllMeetups(req, res) {
      getAll().then(function (results) {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: results.rows
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'No meetups is available'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: 'getSingleMeetup',
    value: function getSingleMeetup(req, res) {
      var meetupId = req.params.meetupId;

      getSpecific(meetupId).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: results.rows[0]
          });
        }
        return res.status(200).json({
          status: 200,
          error: 'Meetup Record not found'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: 'getUpcomingMeetups',
    value: function getUpcomingMeetups(req, res) {
      getUpcoming().then(function (results) {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all upcoming meetups',
            data: results.rows
          });
        }
        return res.status(200).json({
          status: 200,
          error: 'There are no upcoming meetups'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: 'createMeetup',
    value: function createMeetup(req, res) {
      var meetupsDetails = req.body;
      create(meetupsDetails).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Meetup creation successful',
            data: results.rows
          });
        }
        return res.status(500).json({
          status: 500,
          error: 'Meetup creation failed'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }]);

  return MeetupController;
}();

exports.default = MeetupController;