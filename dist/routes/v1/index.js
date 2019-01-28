'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _meetup = require('../../controllers/v1/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

var _auth = require('../../controllers/v1/auth');

var _auth2 = _interopRequireDefault(_auth);

var _users = require('../../controllers/v1/users');

var _users2 = _interopRequireDefault(_users);

var _question = require('../../controllers/v1/question');

var _question2 = _interopRequireDefault(_question);

var _comment = require('../../controllers/v1/comment');

var _comment2 = _interopRequireDefault(_comment);

var _vote = require('../../controllers/v1/vote');

var _vote2 = _interopRequireDefault(_vote);

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

var _jwtDecode = require('../../_helpers/jwtDecode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// deconstructure controllers
var getAllMeetups = _meetup2.default.getAllMeetups,
    getSingleMeetup = _meetup2.default.getSingleMeetup,
    getUpcomingMeetups = _meetup2.default.getUpcomingMeetups,
    createMeetup = _meetup2.default.createMeetup,
    deleteSingleMeetup = _meetup2.default.deleteSingleMeetup,
    deleteAllMeetups = _meetup2.default.deleteAllMeetups;
var createAccount = _auth2.default.createAccount,
    login = _auth2.default.login,
    logout = _auth2.default.logout;
var getAllUsers = _users2.default.getAllUsers,
    getSpecificUser = _users2.default.getSpecificUser,
    deleteAllUsers = _users2.default.deleteAllUsers,
    deleteSpecificUser = _users2.default.deleteSpecificUser;
var getAllQuestions = _question2.default.getAllQuestions,
    getAllQuestionsForMeetup = _question2.default.getAllQuestionsForMeetup,
    getAllQuestionsByUser = _question2.default.getAllQuestionsByUser,
    createQuestion = _question2.default.createQuestion;
var commentQuestion = _comment2.default.commentQuestion,
    getAllComments = _comment2.default.getAllComments,
    getAllCommentsForQuestion = _comment2.default.getAllCommentsForQuestion,
    getAllCommentsByUser = _comment2.default.getAllCommentsByUser;
var upVote = _vote2.default.upVote,
    downVote = _vote2.default.downVote,
    getAllUpvoteForQuestion = _vote2.default.getAllUpvoteForQuestion,
    getAllDownvoteForQuestion = _vote2.default.getAllDownvoteForQuestion;
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
var jwtDecode = _jwtDecode2.default.jwtDecode;


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
router.delete('/meetups', verifyToken, isAdmin, deleteAllMeetups); //

// Authenticaton endpoints
router.post('/auth/signup', createAccountValidator, createAccount); //
router.post('/auth/login', loginAccountValidator, login); //

router.get('/auth/logout', logout);

// User endpoints
router.get('/users', verifyToken, isAdmin, getAllUsers);
router.get('/users/:userId', verifyToken, idValidator, getSpecificUser);
router.delete('/users', verifyToken, isAdmin, deleteAllUsers);
router.delete('/users/:userId', verifyToken, isAdmin, deleteSpecificUser);

// Rsvp endpoints
router.get('/rsvps', verifyToken, isAdmin, getAllRsvps); //
router.get('/:meetupId/rsvps', verifyToken, isAdmin, idValidator, getAllRsvpsForMeetup); //
router.get('/rsvps/user', verifyToken, getAllRsvpsByUser); //

router.post('/meetups/:meetupId/rsvp', verifyToken, idValidator, statusValidator, rsvpMeetup); //

// question endpoints
router.get('/questions', verifyToken, isAdmin, getAllQuestions); //
router.get('/:meetupId/questions', verifyToken, idValidator, getAllQuestionsForMeetup); //
router.get('/questions/user', verifyToken, getAllQuestionsByUser); //
router.get('/:questionId/upvote', verifyToken, idValidator, getAllUpvoteForQuestion); //
router.get('/:questionId/downvote', verifyToken, idValidator, getAllDownvoteForQuestion); //

router.post('/questions', verifyToken, createQuestionValidator, createQuestion); //
router.patch('/questions/:questionId/upvote', verifyToken, idValidator, upVote); //
router.patch('/questions/:questionId/downvote', verifyToken, idValidator, downVote); //


router.get('/comments', verifyToken, isAdmin, getAllComments); //
router.get('/:questionId/comments', verifyToken, getAllCommentsForQuestion); //
router.get('/comments/user/', verifyToken, getAllCommentsByUser); //

router.post('/:questionId/comments', verifyToken, idValidator, commentQuestion); //

router.get('/decode', verifyToken, isAdmin, jwtDecode);

exports.default = router;