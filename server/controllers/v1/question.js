import Meetup from '../../models/v1/meetup';
import Question from '../../models/v1/question';
import User from '../../models/v1/user';

const {
  getAllQuestions, getAllQuestionsForMeetup,
  getAllQuestionsByUser, askQuestion,
} = Question;

const { getSpecificUser } = User;
const { getSpecific } = Meetup;

class QuestionController {
  static getAllQuestions(req, res) {
    getAllQuestions()
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            data: results.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'No question has been asked so far',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static getAllQuestionsForMeetup(req, res) {
    const { meetupId } = req.params;
    getAllQuestionsForMeetup(meetupId)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: results.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'No question has been asked so far',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static getAllQuestionsByUser(req, res) {
    const userId = req.authData.id;
    getSpecificUser(userId)
      .then((user) => {
        const userDetails = {
          fullname: `${user.rows[0].firstname} ${user.rows[0].lastname}`,
          username: user.rows[0].username,
        };
        getAllQuestionsByUser(userId)
          .then((results) => {
            if (results.rowCount > 0) {
              return res.status(200).json({
                status: 200,
                data: results.rows,
                userDetails,
              });
            }
            return res.status(404).json({
              status: 404,
              data: 'No question has been asked so far',
            });
          })
          .catch(error => res.status(400).json({
            status: 400,
            error: error.message,
          }));
      });

  }

  static createQuestion(req, res) {
    const meetupId = req.body.meetupId;
    const question = {
      meetupId,
      userId: req.authData.id,
      title: req.body.title,
      body: req.body.body,
    };
    askQuestion(question)
      .then(results => res.status(201).json({
        status: 201,
        message: 'Question asked successfully',
        data: results.rows,
      }))
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }
}

export default QuestionController;
