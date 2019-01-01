import { Router } from 'express';
import MeetupController from '../dummy/dummyController/meetup.js';

// deconstructure controllers
const { getAllMeetups, getSingleMeetup } = MeetupController;

const router = Router();

// meetup endpoints
router.get('/meetups', getAllMeetups);
router.get('/meetup/:id', getSingleMeetup);







export default router;