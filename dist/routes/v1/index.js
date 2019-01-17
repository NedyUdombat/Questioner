'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _meetup = require('../../controllers/v1/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

var _question = require('../../controllers/v1/question');

var _question2 = _interopRequireDefault(_question);

var _users = require('../../controllers/v1/users');

var _users2 = _interopRequireDefault(_users);

var _rsvp = require('../../controllers/v1/rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

var _ParamsValidator = require('../../middlewares/ParamsValidator');

var _ParamsValidator2 = _interopRequireDefault(_ParamsValidator);

var _VerifyAdmin = require('../../middlewares/VerifyAdmin');

var _VerifyAdmin2 = _interopRequireDefault(_VerifyAdmin);

var _MeetupValidator = require('../../middlewares/MeetupValidator');

var _MeetupValidator2 = _interopRequireDefault(_MeetupValidator);

var _CreateQuestionValidator = require('../../middlewares/CreateQuestionValidator');

var _CreateQuestionValidator2 = _interopRequireDefault(_CreateQuestionValidator);

var _CreateMeetupValidator = require('../../middlewares/CreateMeetupValidator');

var _CreateMeetupValidator2 = _interopRequireDefault(_CreateMeetupValidator);

var _AccountValidator = require('../../middlewares/AccountValidator');

var _AccountValidator2 = _interopRequireDefault(_AccountValidator);

var _VerifyToken = require('../../middlewares/VerifyToken');

var _VerifyToken2 = _interopRequireDefault(_VerifyToken);

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
var createAccount = _users2.default.createAccount,
    loginAccount = _users2.default.loginAccount;

// deconstructure middlewares

var idValidator = _ParamsValidator2.default.idValidator;
var isAdmin = _VerifyAdmin2.default.isAdmin;
var statusValidator = _MeetupValidator2.default.statusValidator;
var createQuestionValidator = _CreateQuestionValidator2.default.createQuestionValidator;
var createMeetupValidator = _CreateMeetupValidator2.default.createMeetupValidator;
var createAccountValidator = _AccountValidator2.default.createAccountValidator,
    loginAccountValidator = _AccountValidator2.default.loginAccountValidator;
var verifyToken = _VerifyToken2.default.verifyToken;


var router = (0, _express.Router)();

// general route
router.get('/', function (req, res) {
  res.json({ message: 'Hi there! Welcome to our Questioner api!' });
});

// meetup endpoints
router.get('/meetups', verifyToken, getAllMeetups); //
router.get('/meetup/:meetupId', verifyToken, idValidator, getSingleMeetup); //
router.get('/meetups/upcoming', verifyToken, getUpcomingMeetups); //

router.post('/meetups', verifyToken, isAdmin, createMeetupValidator, createMeetup); //

// Authenticaton endpoints
router.post('/auth/signup', createAccountValidator, createAccount); //
router.post('/auth/login', loginAccountValidator, loginAccount); //

router.get('/auth/logout', function (req, res) {
  res.status(200).send({ status: 200, auth: false, token: null });
});

// Rsvp endpoints
router.get('/:meetupId/rsvps', verifyToken, idValidator, getAllRsvps); //

router.post('/meetups/:meetupId/rsvp', verifyToken, idValidator, statusValidator, rsvpMeetup); //

// question endpoints
router.get('/questions', verifyToken, getAllQuestions); //

router.post('/questions', verifyToken, createQuestionValidator, createQuestion); //
router.patch('/questions/:questionId/upvote', verifyToken, idValidator, upVote); //
router.patch('/questions/:questionId/downvote', verifyToken, idValidator, downVote); //

router.get('/decode', verifyToken, function (req, res) {
  var jwToken = req.headers['x-access-token'];
  if (!jwToken) return res.status(401).send({ auth: false, message: 'No token provided.' });

  _jsonwebtoken2.default.verify(jwToken, 'iquodIkpaGHAntIm', function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    res.status(200).send(decoded);
  });
});

exports.default = router;