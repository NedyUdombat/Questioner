import { Router } from 'express';
import MeetupController from '../../controllers/v1/meetup';
import QuestionController from '../../controllers/v1/question';
import RsvpController from '../../controllers/v1/rsvp';
import ParamsValidator from '../../middlewares/ParamsValidator';
import VerifyAdmin from '../../middlewares/VerifyAdmin';
import MeetupValidator from '../../middlewares/MeetupValidator';
import UserValidator from '../../middlewares/UserValidator';
import CreateQuestionValidator from '../../middlewares/CreateQuestionValidator';
import CreateMeetupValidator from '../../middlewares/CreateMeetupValidator';

// deconstructure controllers
const {
  getAllMeetups, getSingleMeetup, getUpcomingMeetups, createMeetup,
} = MeetupController;
const { getAllQuestions, createQuestion, upVote, downVote } = QuestionController;
const { rsvpMeetup, getAllRsvps } = RsvpController;

// deconstructure middlewares
const { idValidator } = ParamsValidator;
const { isAdmin } = VerifyAdmin;
const { statusValidator } = MeetupValidator;
const { userValidator } = UserValidator;
const { createQuestionValidator } = CreateQuestionValidator;
const { createMeetupValidator } = CreateMeetupValidator;


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

// Rsvp endpoints
router.get('/:meetupId/rsvps', idValidator, getAllRsvps);//

router.post('/meetups/:meetupId/rsvp', idValidator, statusValidator, rsvpMeetup);//

// question endpoints
router.get('/questions', getAllQuestions);//

router.post('/questions', createQuestionValidator, createQuestion);//
router.patch('/questions/:questionId/upvote', idValidator, upVote);//
router.patch('/questions/:questionId/downvote', idValidator, downVote);//

export default router;
