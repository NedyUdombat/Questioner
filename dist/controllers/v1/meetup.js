'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import users from '../../models/v1/users';


var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _meetups = require('../../models/v1/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

var _post_validators = require('../../_helpers/post_validators');

var _post_validators2 = _interopRequireDefault(_post_validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeetupController = function () {
  function MeetupController() {
    _classCallCheck(this, MeetupController);
  }

  _createClass(MeetupController, null, [{
    key: 'getAllMeetups',
    value: function getAllMeetups(req, res) {
      if (_meetups2.default.length > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Successfully retrieved all meetups',
          data: _meetups2.default
        });
      }
      return res.status(404).json({
        status: 404,
        message: 'No meetup is available'
      });
    }
  }, {
    key: 'getSingleMeetup',
    value: function getSingleMeetup(req, res) {
      var meetupId = req.params.meetupId;

      var foundMeetup = _meetups2.default.find(function (meetup) {
        return meetup.id === parseInt(meetupId, 10);
      });

      if (foundMeetup) {
        return res.status(200).json({
          status: 200,
          message: 'Successfully retrieved specific meetup',
          data: foundMeetup
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Meetup record not found'
      });
    }
  }, {
    key: 'getUpcomingMeetups',
    value: function getUpcomingMeetups(req, res) {
      var upcomingMeetups = _meetups2.default.filter(function (meetup) {
        return (0, _moment2.default)(meetup.happeningOn).isAfter(Date.now());
      });
      if (upcomingMeetups.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'There are no upcoming meetups'
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Successfully retrieved all upcoming meetups',
        data: upcomingMeetups
      });
    }
  }, {
    key: 'createMeetup',
    value: function createMeetup(req, res) {
      var _req$body = req.body,
          organizer = _req$body.organizer,
          topic = _req$body.topic,
          happeningOn = _req$body.happeningOn,
          location = _req$body.location,
          tags = _req$body.tags,
          images = _req$body.images;

      var id = _meetups2.default.length + 1;
      var meetupDetail = {
        id: id, organizer: organizer, topic: topic, happeningOn: happeningOn, location: location, tags: tags, images: images, createdOn: new Date()
      };
      _meetups2.default.push(meetupDetail);
      return res.status(201).json({
        status: 201,
        message: 'Meetup successfully created',
        data: meetupDetail
      });
    }
  }, {
    key: 'rsvpMeetup',
    value: function rsvpMeetup(req, res) {
      var status = req.body.status;
      var meetupId = req.params.meetupId;

      var foundMeetup = _meetups2.default.find(function (meetup) {
        return meetup.id === parseInt(meetupId, 10);
      });
      if (foundMeetup) {
        var rsvpDetail = {
          meetupId: foundMeetup.id,
          topic: foundMeetup.topic,
          location: foundMeetup.location,
          status: status
        };
        return res.status(201).json({
          status: 201,
          message: 'Rsvp meetup successful',
          data: rsvpDetail
        });
      }
      return res.status(404).json({
        error: 'Meetup not found'
      });
    }
  }]);

  return MeetupController;
}();

exports.default = MeetupController;