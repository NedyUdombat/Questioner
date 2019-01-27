import { Router } from 'express';
import jwt from 'jsonwebtoken';
import MeetupController from '../../controllers/v1/meetup';
import AuthController from '../../controllers/v1/auth';
import UserController from '../../controllers/v1/users';
import QuestionController from '../../controllers/v1/question';
import RsvpController from '../../controllers/v1/rsvp';
import ParamsValidator from '../../middlewares/ParamsValidator';
import VerifyAdmin from '../../middlewares/VerifyAdmin';
import MeetupValidator from '../../middlewares/MeetupValidator';
import CreateQuestionValidator from '../../middlewares/CreateQuestionValidator';
import CreateMeetupValidator from '../../middlewares/CreateMeetupValidator';
import AccountValidator from '../../middlewares/AccountValidator';
import VerifyToken from '../../middlewares/VerifyToken';


// deconstructure controllers
const {
  getAllMeetups, getSingleMeetup, getUpcomingMeetups, createMeetup, deleteSingleMeetup,
} = MeetupController;
const { createAccount, loginAccount } = AuthController;
const { getAllUsers, getSpecificUser, deleteAllUsers, deleteSpecificUser } = UserController;
const {
  getAllQuestions, createQuestion,
  upVote, downVote, getAllUpvoteForQuestion,
  getAllDownvoteForQuestion, commentQuestion,
} = QuestionController;
const { rsvpMeetup, getAllRsvps, getAllRsvpsForMeetup, getAllRsvpsByUser } = RsvpController;

// deconstructure middlewares
const { idValidator } = ParamsValidator;
const { isAdmin } = VerifyAdmin;
const { statusValidator } = MeetupValidator;
const { createQuestionValidator } = CreateQuestionValidator;
const { createMeetupValidator } = CreateMeetupValidator;
const { createAccountValidator, loginAccountValidator } = AccountValidator;
const { verifyToken } = VerifyToken;

const router = Router();

// general route
router.get('/', (req, res) => {
  res.json({ message: 'Hi there! Welcome to version 1 of Questioner API!' });
});

// meetup endpoints
router.get('/meetups', verifyToken, getAllMeetups);//
router.get('/meetups/upcoming', getUpcomingMeetups);//
router.get('/meetups/:meetupId', verifyToken, idValidator, getSingleMeetup);//

router.post('/meetups', verifyToken, isAdmin, createMeetupValidator, createMeetup);//

router.delete('/meetups/:meetupId', verifyToken, isAdmin, idValidator, deleteSingleMeetup);//

// Authenticaton endpoints
router.post('/auth/signup', createAccountValidator, createAccount);//
router.post('/auth/login', loginAccountValidator, loginAccount);//

router.get('/auth/logout', (req, res) => {
  res.status(200).send({ status: 200, auth: false, token: null });
});

// User endpoints
router.get('/users', verifyToken, isAdmin, getAllUsers);
router.get('/users/:userId', verifyToken, idValidator, getSpecificUser);
router.delete('/users', verifyToken, isAdmin, deleteAllUsers);
router.delete('/users/:userId', verifyToken, isAdmin, deleteSpecificUser);

// Rsvp endpoints
router.get('/rsvps', verifyToken, isAdmin, getAllRsvps);//
router.get('/:meetupId/rsvps', verifyToken, isAdmin, idValidator, getAllRsvpsForMeetup);//
router.get('/rsvps/:userId', verifyToken, idValidator, getAllRsvpsByUser);//

router.post('/meetups/:meetupId/rsvp', verifyToken, idValidator, statusValidator, rsvpMeetup);//

// question endpoints
router.get('/questions', verifyToken, isAdmin, getAllQuestions);//
router.get('/:questionId/upvote', verifyToken, getAllUpvoteForQuestion);//
router.get('/:questionId/downvote', verifyToken, getAllDownvoteForQuestion);//

router.post('/questions', verifyToken, createQuestionValidator, createQuestion);//
router.patch('/questions/:questionId/upvote', verifyToken, idValidator, upVote);//
router.patch('/questions/:questionId/downvote', verifyToken, idValidator, downVote);//


router.post('/:questionId/comments', verifyToken, idValidator, commentQuestion);//

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

export default router;
