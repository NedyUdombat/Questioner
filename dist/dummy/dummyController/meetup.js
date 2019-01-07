'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dummyMeetups = require('../dummyModel/dummyMeetups');

var _dummyMeetups2 = _interopRequireDefault(_dummyMeetups);

var _dummyUser = require('../dummyModel/dummyUser');

var _dummyUser2 = _interopRequireDefault(_dummyUser);

var _post_validators = require('../_helpers/post_validators');

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
      if (_dummyMeetups2.default.length > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Successfully retrieved all meetups',
          data: _dummyMeetups2.default
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
      var foundMeetup = _dummyMeetups2.default.find(function (meetup) {
        return meetup.id === parseInt(req.params.id, 10);
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
      var currentDate = new Date();
      var upcomingMeetups = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _dummyMeetups2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var meetup = _step.value;

          var happeningOn = new Date(meetup.happeningOn);
          if (happeningOn.getFullYear() === currentDate.getFullYear()) {
            if (happeningOn.getMonth() > currentDate.getMonth()) {
              upcomingMeetups.push(meetup);
            } else if (happeningOn.getMonth() === currentDate.getMonth()) {
              if (happeningOn.getDate() > currentDate.getDate()) {
                upcomingMeetups.push(meetup);
              }
            }
          } else if (happeningOn.getFullYear() > currentDate.getFullYear()) {
            upcomingMeetups.push(meetup);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

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
          images = _req$body.images,
          username = _req$body.username;

      var fields = { organizer: organizer, topic: topic, happeningOn: happeningOn, location: location, username: username };
      var validator = new _post_validators2.default();
      validator.validate(fields, 'required|string');
      if (!validator.hasErrors) {
        var foundUser = _dummyUser2.default.find(function (user) {
          return user.username === req.body.username;
        });
        if (foundUser.isAdmin === false) {
          return res.status(401).json({
            status: 401,
            error: 'Only an Admin can create meetups'
          });
        }
        var isDuplicate = false;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _dummyMeetups2.default[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var event = _step2.value;

            isDuplicate = event.topic === fields.topic && event.location === fields.location;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (isDuplicate) {
          return res.status(409).json({ status: 409, error: 'This event \'' + fields.topic + '\' cannot be created twice' });
        }
        var id = _dummyMeetups2.default.length + 1;
        var meetupDetail = { id: id, organizer: organizer, topic: topic, happeningOn: happeningOn, location: location, tags: tags, images: images, createdOn: new Date() };
        _dummyMeetups2.default.push(meetupDetail);
        return res.status(201).json({
          status: 201,
          message: 'Meetup successfully created',
          data: meetupDetail
        });
      }
      return res.status(400).json({ errorMessages: validator.getErrors() });
    }
  }, {
    key: 'rsvpMeetup',
    value: function rsvpMeetup(req, res) {
      var status = req.body.status;

      status = status.toLowerCase();
      var rsvpStatus = status === 'yes' || status === 'no' || status === 'maybe';
      var foundMeetup = _dummyMeetups2.default.find(function (meetup) {
        return meetup.id === parseInt(req.params.id, 10);
      });
      if (foundMeetup) {
        if (rsvpStatus) {
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
        return res.status(400).json({
          error: 'Rsvp should be yes, no, or maybe'
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