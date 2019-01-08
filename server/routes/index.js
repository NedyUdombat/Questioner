import { Router } from 'express';
import MeetupController from '../dummy/dummyController/meetup';
import QuestionController from '../dummy/dummyController/question';

// deconstructure controllers
const { getAllMeetups, getSingleMeetup, getUpcomingMeetups, createMeetup, rsvpMeetup } = MeetupController;
const { createQuestion, upVote, downVote } = QuestionController;

const router = Router();

// general route
router.get('/', (req, res) => {
  res.json({ message: 'Hi there! Welcome to our Questioner api!' });
});

// meetup endpoints
router.get('/meetups', getAllMeetups);
router.get('/meetup/:id', getSingleMeetup);
router.get('/meetups/upcoming', getUpcomingMeetups);

router.post('/meetups', createMeetup);
router.post('/meetups/:id/rsvps', rsvpMeetup);

// question endpoints
router.post('/questions', createQuestion);
router.patch('/questions/:id/upvote', upVote);
router.patch('/questions/:id/downvote', downVote);

export default router;
