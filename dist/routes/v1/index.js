'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _meetup = require('../../controllers/v1/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

var _auth = require('../../controllers/v1/auth');

var _auth2 = _interopRequireDefault(_auth);

var _users = require('../../controllers/v1/users');

var _users2 = _interopRequireDefault(_users);

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
    createMeetup = _meetup2.default.createMeetup,
    deleteSingleMeetup = _meetup2.default.deleteSingleMeetup;
var createAccount = _auth2.default.createAccount,
    loginAccount = _auth2.default.loginAccount;
var getAllUsers = _users2.default.getAllUsers,
    getSpecificUser = _users2.default.getSpecificUser,
    deleteAllUsers = _users2.default.deleteAllUsers,
    deleteSpecificUser = _users2.default.deleteSpecificUser;
var getAllQuestions = _question2.default.getAllQuestions,
    createQuestion = _question2.default.createQuestion,
    upVote = _question2.default.upVote,
    downVote = _question2.default.downVote,
    getAllUpvoteForQuestion = _question2.default.getAllUpvoteForQuestion,
    getAllDownvoteForQuestion = _question2.default.getAllDownvoteForQuestion,
    commentQuestion = _question2.default.commentQuestion;
var rsvpMeetup = _rsvp2.default.rsvpMeetup,
    getAllRsvps = _rsvp2.default.getAllRsvps,
    getAllRsvpsForMeetup = _rsvp2.default.getAllRsvpsForMeetup,
    getAllRsvpsByUser = _rsvp2.default.getAllRsvpsByUser;

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
  res.json({ message: 'Hi there! Welcome to version 1 of Questioner API!' });
});

// meetup endpoints
router.get('/meetups', verifyToken, getAllMeetups); //
router.get('/meetups/upcoming', getUpcomingMeetups); //
router.get('/meetups/:meetupId', verifyToken, idValidator, getSingleMeetup); //

router.post('/meetups', verifyToken, isAdmin, createMeetupValidator, createMeetup); //

router.delete('/meetups/:meetupId', verifyToken, isAdmin, idValidator, deleteSingleMeetup); //

// Authenticaton endpoints
router.post('/auth/signup', createAccountValidator, createAccount); //
router.post('/auth/login', loginAccountValidator, loginAccount); //

router.get('/auth/logout', function (req, res) {
  res.status(200).send({ status: 200, auth: false, token: null });
});

// User endpoints
router.get('/users', verifyToken, isAdmin, getAllUsers);
router.get('/users/:userId', verifyToken, idValidator, getSpecificUser);
router.delete('/users', verifyToken, isAdmin, deleteAllUsers);
router.delete('/users/:userId', verifyToken, isAdmin, deleteSpecificUser);

// Rsvp endpoints
router.get('/rsvps', verifyToken, isAdmin, getAllRsvps); //
router.get('/:meetupId/rsvps', verifyToken, isAdmin, idValidator, getAllRsvpsForMeetup); //
router.get('/rsvps/:userId', verifyToken, idValidator, getAllRsvpsByUser); //

router.post('/meetups/:meetupId/rsvp', verifyToken, idValidator, statusValidator, rsvpMeetup); //

// question endpoints
router.get('/questions', verifyToken, isAdmin, getAllQuestions); //
router.get('/:questionId/upvote', verifyToken, getAllUpvoteForQuestion); //
router.get('/:questionId/downvote', verifyToken, getAllDownvoteForQuestion); //

router.post('/questions', verifyToken, createQuestionValidator, createQuestion); //
router.patch('/questions/:questionId/upvote', verifyToken, idValidator, upVote); //
router.patch('/questions/:questionId/downvote', verifyToken, idValidator, downVote); //


router.post('/:questionId/comments', verifyToken, idValidator, commentQuestion); //

// router.get('/decode', verifyToken, isAdmin, (req, res) => {
//   const jwToken = req.headers['x-access-token'];
//   if (!jwToken) return res.status(401).send({ auth: false, message: 'No token provided.' });
//
//   jwt.verify(jwToken, 'iquodIkpaGHAntIm', (err, decoded) => {
//     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//
//     res.status(200).send(decoded);
//   });
// });

exports.default = router;