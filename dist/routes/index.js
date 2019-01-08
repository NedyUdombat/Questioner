'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _meetup = require('../dummy/dummyController/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

var _question = require('../dummy/dummyController/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// deconstructure controllers
var getAllMeetups = _meetup2.default.getAllMeetups,
    getSingleMeetup = _meetup2.default.getSingleMeetup,
    getUpcomingMeetups = _meetup2.default.getUpcomingMeetups,
    createMeetup = _meetup2.default.createMeetup,
    rsvpMeetup = _meetup2.default.rsvpMeetup;
var createQuestion = _question2.default.createQuestion,
    upVote = _question2.default.upVote,
    downVote = _question2.default.downVote;


var router = (0, _express.Router)();

// general route
router.get('/', function (req, res) {
  res.json({ message: 'Hi there! Welcome to our Questioner api!' });
});

// meetup endpoints
router.get('/meetups', getAllMeetups);
router.get('/meetup/:id', getSingleMeetup);
router.get('/meetups/upcoming', getUpcomingMeetups);

router.post('/meetups', createMeetup);
router.post('/meetups/:id/rsvps', rsvpMeetup);

// question endpoints
router.post('/questions', createQuestion);
router.patch('/questions/:id/upvote', upVote);
router.patch('/questions/:id/downvote', downVote);

exports.default = router;