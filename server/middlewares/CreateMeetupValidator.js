import moment from 'moment';
import pool from '../database/dbConfig';
import Validator from '../_helpers/post_validators';

class CreateMeetupValidator {
  static createMeetupValidator(req, res, next) {
    const { organizerName, topic, happeningOn, location } = req.body;

    const fields = {
      organizerName, topic, happeningOn, location,
    };
    const validator = new Validator();
    validator.validate(fields, 'required|string');

    if (validator.hasErrors) {
      return res.status(400).json({
        errorMessages: validator.getErrors(),
      });
    } if (moment(happeningOn).isBefore(Date.now())) {
      return res.status(400).json({
        status: 400,
        message: 'You cannot create meetup in the past',
      });
    }
    return next();
  }

  static createMeetupDuplicateValidator(req, res, next) {
    const meetupDetails = req.body;
    pool.query(`SELECT * from meetups where topic = '${meetupDetails.topic}' AND location = '${meetupDetails.location}' AND happening_on= '${meetupDetails.happeningOn}'`)
      .then((foundMeetup) => {
        if (foundMeetup.rowCount > 0) {
          return res.status(409).json({
            status: 409,
            message: 'Meetup Already Exists',
            error: true,
          });
        }
        return next();
      }).catch(err => (
        res.status(500).json(err)
      ));
  }
}

export default CreateMeetupValidator;
