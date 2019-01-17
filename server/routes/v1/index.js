import { Router } from 'express';
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


const router = Router();

// general route
router.get('/', (req, res) => {
  res.json({ message: 'Hi there! Welcome to our Questioner api!' });
});

// meetup endpoints
router.get('/meetups', getAllMeetups);//
router.get('/meetup/:meetupId', idValidator, getSingleMeetup);//
router.get('/meetups/upcoming', getUpcomingMeetups);//

router.post('/meetups', isAdmin, createMeetupValidator, createMeetup);//

// Authenticaton endpoints
router.post('/auth/signup', createAccountValidator, createAccount);//
router.post('/auth/login', loginAccountValidator, loginAccount);//


// Rsvp endpoints
router.get('/:meetupId/rsvps', idValidator, getAllRsvps);//

router.post('/meetups/:meetupId/rsvp', idValidator, statusValidator, rsvpMeetup);//

// question endpoints
router.get('/questions', getAllQuestions);//

router.post('/questions', createQuestionValidator, createQuestion);//
router.patch('/questions/:questionId/upvote', idValidator, upVote);//
router.patch('/questions/:questionId/downvote', idValidator, downVote);//

export default router;
