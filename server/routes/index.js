import { Router } from 'express';
import MeetupController from '../dummy/dummyController/meetup.js';

// deconstructure controllers
const { getAllMeetups, getSingleMeetup } = MeetupController;

const router = Router();

//general route
router.get('/', (req, res) => {
  res.json({ message: 'Hi there! Welcome to our Queestioner api!' });
});


// meetup endpoints
router.get('/meetups', getAllMeetups);
router.get('/meetup/:id', getSingleMeetup);







export default router;