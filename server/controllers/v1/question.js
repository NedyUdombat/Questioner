import Questions from '../../models/v1/questions';

const { getAllQuestions, askQuestion, voteQuestion } = Questions;

class QuestionController {
  static getAllQuestions(req, res) {
    getAllQuestions()
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

  static createQuestion(req, res) {
    const meetupId = req.body.meetupId;
    const userId = req.body.userId;
    const question = {
      meetupId,
      userId,
      title: req.body.title,
      body: req.body.body,
    };
    askQuestion(question)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Question asked successfully',
            data: results.rows,
          });
        }
        return res.json(400).json({
          status: 400,
          error: 'Question could not be asked',
        });
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }

  static upVote(req, res) {
    const userId = req.body.userId;
    const questionId = req.params.questionId;

    const question = {
      userId,
      questionId,
      voteType: 'upvote',
    };
    voteQuestion(question)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Question upvote successful',
            data: results.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          message: 'Question upvote unsuccessful',
        });
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }

  static downVote(req, res) {
    const userId = req.body.userId;
    const questionId = req.params.questionId;

    const question = {
      userId,
      questionId,
      voteType: 'downvote',
    };
    voteQuestion(question)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Question downvote successful',
            data: results.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          message: 'Question downvote unsuccessful',
        });
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }
}

export default QuestionController;
