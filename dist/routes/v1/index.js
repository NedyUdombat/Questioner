'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _meetup = require('../../controllers/v1/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

var _question = require('../../controllers/v1/question');

var _question2 = _interopRequireDefault(_question);

var _rsvp = require('../../controllers/v1/rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

var _ParamsValidator = require('../../middlewares/ParamsValidator');

var _ParamsValidator2 = _interopRequireDefault(_ParamsValidator);

var _VerifyAdmin = require('../../middlewares/VerifyAdmin');

var _VerifyAdmin2 = _interopRequireDefault(_VerifyAdmin);

var _MeetupValidator = require('../../middlewares/MeetupValidator');

var _MeetupValidator2 = _interopRequireDefault(_MeetupValidator);

var _UserValidator = require('../../middlewares/UserValidator');

var _UserValidator2 = _interopRequireDefault(_UserValidator);

var _CreateQuestionValidator = require('../../middlewares/CreateQuestionValidator');

var _CreateQuestionValidator2 = _interopRequireDefault(_CreateQuestionValidator);

var _CreateMeetupValidator = require('../../middlewares/CreateMeetupValidator');

var _CreateMeetupValidator2 = _interopRequireDefault(_CreateMeetupValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// deconstructure controllers
var getAllMeetups = _meetup2.default.getAllMeetups,
    getSingleMeetup = _meetup2.default.getSingleMeetup,
    getUpcomingMeetups = _meetup2.default.getUpcomingMeetups,
    createMeetup = _meetup2.default.createMeetup;
var getAllQuestions = _question2.default.getAllQuestions,
    createQuestion = _question2.default.createQuestion,
    upVote = _question2.default.upVote,
    downVote = _question2.default.downVote;
var rsvpMeetup = _rsvp2.default.rsvpMeetup,
    getAllRsvps = _rsvp2.default.getAllRsvps;

// deconstructure middlewares

var idValidator = _ParamsValidator2.default.idValidator;
var isAdmin = _VerifyAdmin2.default.isAdmin;
var statusValidator = _MeetupValidator2.default.statusValidator;
var userValidator = _UserValidator2.default.userValidator;
var createQuestionValidator = _CreateQuestionValidator2.default.createQuestionValidator;
var createMeetupValidator = _CreateMeetupValidator2.default.createMeetupValidator;


var router = (0, _express.Router)();

// general route
router.get('/', function (req, res) {
  res.json({ message: 'Hi there! Welcome to our Questioner api!' });
});

// meetup endpoints
router.get('/meetups', getAllMeetups); //
router.get('/meetup/:meetupId', idValidator, getSingleMeetup); //
router.get('/meetups/upcoming', getUpcomingMeetups); //

router.post('/meetups', isAdmin, createMeetupValidator, createMeetup); //

// Rsvp endpoints
router.get('/:meetupId/rsvps', idValidator, getAllRsvps); //

router.post('/meetups/:meetupId/rsvp', idValidator, statusValidator, rsvpMeetup); //

// question endpoints
router.get('/questions', getAllQuestions); //

router.post('/questions', createQuestionValidator, createQuestion); //
router.patch('/questions/:questionId/upvote', idValidator, upVote); //
router.patch('/questions/:questionId/downvote', idValidator, downVote); //

exports.default = router;