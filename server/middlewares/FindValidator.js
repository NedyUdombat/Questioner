import Question from '../models/v1/question';

const { getSpecificQuestion } = Question;

class FindValidator {
  static verifyQuestionId(req, res, next) {
    const { questionId } = req.params;
    getSpecificQuestion(questionId)
      .then((results) => {
        if (results.rowCount === 0) {
          return res.status(404).json({
            status: 404,
            message: 'Question does not exist',
            error: true,
          });
        }
        return next();
      });
  }
}

export default FindValidator;
