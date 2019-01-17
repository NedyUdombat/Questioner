import { Router } from 'express';
import jwt from 'jsonwebtoken';
import MeetupController from '../../controllers/v1/meetup';
import QuestionController from '../../controllers/v1/question';
import AuthController from '../../controllers/v1/users';
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
  getAllMeetups, getSingleMeetup, getUpcomingMeetups, createMeetup,
} = MeetupController;
const { getAllQuestions, createQuestion, upVote, downVote } = QuestionController;
const { rsvpMeetup, getAllRsvps } = RsvpController;
const { createAccount, loginAccount } = AuthController;

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
router.get('/meetups/upcoming', verifyToken, getUpcomingMeetups);//
router.get('/meetups/:meetupId', verifyToken, idValidator, getSingleMeetup);//

router.post('/meetups', verifyToken, isAdmin, createMeetupValidator, createMeetup);//

// Authenticaton endpoints
router.post('/auth/signup', createAccountValidator, createAccount);//
router.post('/auth/login', loginAccountValidator, loginAccount);//

router.get('/auth/logout', (req, res) => {
  res.status(200).send({ status: 200, auth: false, token: null });
});

// Rsvp endpoints
router.get('/:meetupId/rsvps', verifyToken, idValidator, getAllRsvps);//

router.post('/meetups/:meetupId/rsvp', verifyToken, idValidator, statusValidator, rsvpMeetup);//

// question endpoints
router.get('/questions', verifyToken, getAllQuestions);//

router.post('/questions', verifyToken, createQuestionValidator, createQuestion);//
router.patch('/questions/:questionId/upvote', verifyToken, idValidator, upVote);//
router.patch('/questions/:questionId/downvote', verifyToken, idValidator, downVote);//

router.get('/decode', verifyToken, (req, res) => {
  const jwToken = req.headers['x-access-token'];
  if (!jwToken) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(jwToken, 'iquodIkpaGHAntIm', (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    res.status(200).send(decoded);
  });
});

export default router;
