import { Router } from 'express';
import expressJoi from 'express-joi-validator';
import MeetupController from '../../controllers/v1/meetup';
import QuestionController from '../../controllers/v1/question';
import ParamsValidator from '../../middlewares/ParamsValidator';
import VerifyAdmin from '../../middlewares/VerifyAdmin';
import createMeetupSchema from '../../middlewares/CreateMeetupSchema';
import MeetupValidator from '../../middlewares/MeetupValidator';
import UserValidator from '../../middlewares/UserValidator';
import CreateQuestionValidator from '../../middlewares/CreateQuestionValidator';
import CreateMeetupValidator from '../../middlewares/CreateMeetupValidator';

// deconstructure controllers
const {
  getAllMeetups, getSingleMeetup, getUpcomingMeetups, createMeetup, rsvpMeetup,
} = MeetupController;
const { createQuestion, upVote, downVote } = QuestionController;


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
router.get('/meetups', getAllMeetups);
router.get('/meetup/:meetupId', idValidator, getSingleMeetup);
router.get('/meetups/upcoming', getUpcomingMeetups);

router.post('/meetups', isAdmin, createMeetupValidator, createMeetup);
router.post('/meetups/:meetupId/rsvps', idValidator, statusValidator, rsvpMeetup);

// question endpoints
router.post('/questions', createQuestionValidator, createQuestion);
router.patch('/questions/:questionId/upvote', idValidator, userValidator, upVote);
router.patch('/questions/:questionId/downvote', idValidator, userValidator, downVote);

export default router;
