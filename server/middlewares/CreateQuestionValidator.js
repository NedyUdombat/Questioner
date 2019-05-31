import Validator from '../_helpers/post_validators';

class CreateQuestionValidator {
  static createQuestionValidator(req, res, next) {
    const { body } = req.body;

    const fields = {
      body,
    };
    const validator = new Validator();
    validator.validate(fields, 'required|string');

    if (validator.hasErrors) {
      return res.status(400).json({
        errorMessages: validator.getErrors(),
      });
    }
    return next();
  }
}

export default CreateQuestionValidator;
