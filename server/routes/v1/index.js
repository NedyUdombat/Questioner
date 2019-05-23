import { Router } from 'express';
import MeetupController from '../../controllers/v1/meetup';
import AuthController from '../../controllers/v1/auth';
import UserController from '../../controllers/v1/users';
import QuestionController from '../../controllers/v1/question';
import CommentController from '../../controllers/v1/comment';
import VoteController from '../../controllers/v1/vote';
import RsvpController from '../../controllers/v1/rsvp';
import ParamsValidator from '../../middlewares/ParamsValidator';
import VerifyAdmin from '../../middlewares/VerifyAdmin';
import RsvpValidator from '../../middlewares/RsvpValidator';
import CreateQuestionValidator from '../../middlewares/CreateQuestionValidator';
import CreateMeetupValidator from '../../middlewares/CreateMeetupValidator';
import FindValidator from '../../middlewares/FindValidator';
import AccountValidator from '../../middlewares/AccountValidator';
import VerifyToken from '../../middlewares/VerifyToken';
import JwtDecode from '../../_helpers/jwtDecode';
import Upload from '../../middlewares/ImageUpload';

// deconstructure controllers
const {
  getAllMeetups, getSingleMeetup,
  getUpcomingMeetups, createMeetup,
  deleteSingleMeetup, deleteAllMeetups,
  editMeetup,
} = MeetupController;

const { createAccount, login, logout } = AuthController;

const {
  getAllUsers, getSpecificUser,
  deleteAllUsers, deleteSpecificUser,
  getAnyUser,
} = UserController;

const {
  getAllQuestions, getAllQuestionsForMeetup,
  getAllQuestionsByUser, createQuestion,
  getSpecificQuestion,
} = QuestionController;

const {
  commentQuestion, getAllComments,
  getAllCommentsForQuestion, getAllCommentsByUser,
} = CommentController;

const {
  upVote, downVote,
  getAllUpvoteForQuestion, getAllDownvoteForQuestion,
} = VoteController;

const {
  rsvpMeetup, getAllRsvps,
  getAllRsvpsForMeetup, getAllRsvpsByUser,
  checkRsvpMeetup,
} = RsvpController;

// deconstructure middlewares
const { idValidator } = ParamsValidator;
const { isAdmin } = VerifyAdmin;
const { rsvpDuplicateValidator } = RsvpValidator;
const { createQuestionValidator } = CreateQuestionValidator;
const { createMeetupValidator, createMeetupDuplicateValidator } = CreateMeetupValidator;
const {
  createAccountInputValidator, loginAccountValidator,
  createAccountDuplicateValidator,
} = AccountValidator;
const { verifyQuestionId } = FindValidator;
const { verifyToken } = VerifyToken;
const { jwtDecode } = JwtDecode;


const router = Router();

// general route
router.get('/', (req, res) => {
  res.json({ message: 'Hi there! Welcome to version 1 of Questioner API!' });
});

router.post('/images', Upload.single('image'), (req, res) => {
  res.status(201).json({
    result: req.file,
  });
});


// meetup endpoints
router.get('/meetups', verifyToken, getAllMeetups);//
router.get('/meetups/upcoming', getUpcomingMeetups);//
router.get('/meetups/:meetupId', verifyToken, idValidator, getSingleMeetup);//

router.post('/meetups', verifyToken, isAdmin, createMeetupValidator, createMeetupDuplicateValidator, Upload.single('image'), createMeetup);//
router.patch('/meetups/:id', verifyToken, isAdmin, createMeetupValidator, Upload.single('image'), editMeetup);//

router.delete('/meetups/:meetupId', verifyToken, isAdmin, idValidator, deleteSingleMeetup);//
router.delete('/meetups', verifyToken, isAdmin, deleteAllMeetups);//

// Authenticaton endpoints
router.post('/auth/signup', createAccountInputValidator, createAccountDuplicateValidator, createAccount);//
router.post('/auth/login', loginAccountValidator, login);//

router.post('/auth/logout', logout);

// User endpoints
router.get('/users', verifyToken, isAdmin, getAllUsers);
router.get('/user', verifyToken, getSpecificUser);
router.get('/user/:userId', verifyToken, idValidator, getAnyUser);
router.delete('/users', verifyToken, isAdmin, deleteAllUsers);
router.delete('/users/:userId', verifyToken, isAdmin, idValidator, deleteSpecificUser);

// Rsvp endpoints
router.get('/rsvps', verifyToken, isAdmin, getAllRsvps);//
router.get('/:meetupId/rsvps', verifyToken, isAdmin, idValidator, getAllRsvpsForMeetup);//
router.get('/rsvps/user', verifyToken, getAllRsvpsByUser);//
router.get('/:meetupId/rsvp/user', verifyToken, idValidator, checkRsvpMeetup);//

router.post('/meetups/:meetupId/rsvp', verifyToken, idValidator, rsvpDuplicateValidator, rsvpMeetup);//

// question endpoints
router.get('/questions', verifyToken, isAdmin, getAllQuestions);//
router.get('/:meetupId/questions', verifyToken, idValidator, getAllQuestionsForMeetup);//
router.get('/questions/user', verifyToken, getAllQuestionsByUser);//
router.get('/questions/:questionId', verifyToken, idValidator, verifyQuestionId, getSpecificQuestion);//
router.get('/:questionId/upvote', verifyToken, idValidator, verifyQuestionId, getAllUpvoteForQuestion);//
router.get('/:questionId/downvote', verifyToken, idValidator, verifyQuestionId, getAllDownvoteForQuestion);//

router.post('/questions', verifyToken, createQuestionValidator, createQuestion);//
router.patch('/questions/:questionId/upvote', verifyToken, idValidator, verifyQuestionId, upVote);//
router.patch('/questions/:questionId/downvote', verifyToken, idValidator, verifyQuestionId, downVote);//

// comments endpoints
router.get('/comments', verifyToken, isAdmin, getAllComments);//
router.get('/:questionId/comments', verifyToken, idValidator, verifyQuestionId, getAllCommentsForQuestion);//
router.get('/comments/user/', verifyToken, getAllCommentsByUser);//

router.post('/:questionId/comments', verifyToken, idValidator, verifyQuestionId, commentQuestion);//

router.get('/decode', verifyToken, jwtDecode);

export default router;
