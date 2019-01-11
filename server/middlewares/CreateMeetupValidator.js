import Validator from '../_helpers/post_validators';

class CreateMeetupValidator {
  static createMeetupValidator(req, res, next) {
    const { organizer, topic, happeningOn, location } = req.body;

    const fields = {
      organizer, topic, happeningOn, location,
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

export default CreateMeetupValidator;
