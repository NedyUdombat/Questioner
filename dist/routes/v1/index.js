'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _expressJoiValidator = require('express-joi-validator');

var _expressJoiValidator2 = _interopRequireDefault(_expressJoiValidator);

var _meetup = require('../../controllers/v1/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

var _question = require('../../controllers/v1/question');

var _question2 = _interopRequireDefault(_question);

var _ParamsValidator = require('../../middlewares/ParamsValidator');

var _ParamsValidator2 = _interopRequireDefault(_ParamsValidator);

var _VerifyAdmin = require('../../middlewares/VerifyAdmin');

var _VerifyAdmin2 = _interopRequireDefault(_VerifyAdmin);

var _CreateMeetupSchema = require('../../middlewares/CreateMeetupSchema');

var _CreateMeetupSchema2 = _interopRequireDefault(_CreateMeetupSchema);

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
    createMeetup = _meetup2.default.createMeetup,
    rsvpMeetup = _meetup2.default.rsvpMeetup;
var createQuestion = _question2.default.createQuestion,
    upVote = _question2.default.upVote,
    downVote = _question2.default.downVote;

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
router.get('/meetups', getAllMeetups);
router.get('/meetup/:meetupId', idValidator, getSingleMeetup);
router.get('/meetups/upcoming', getUpcomingMeetups);

router.post('/meetups', isAdmin, createMeetupValidator, createMeetup);
router.post('/meetups/:meetupId/rsvps', idValidator, statusValidator, rsvpMeetup);

// question endpoints
router.post('/questions', createQuestionValidator, createQuestion);
router.patch('/questions/:questionId/upvote', idValidator, userValidator, upVote);
router.patch('/questions/:questionId/downvote', idValidator, userValidator, downVote);

exports.default = router;