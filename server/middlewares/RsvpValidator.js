import pool from '../database/dbConfig';
import Rsvps from '../models/v1/rsvps';

const { changeRsvpMeetup } = Rsvps;

class RsvpValidator {
  static rsvpDuplicateValidator(req, res, next) {
    const rsvp = {
      meetupId: req.params.meetupId,
      userId: req.authData.id,
    };
    let newResponse;
    pool.query(`SELECT * from rsvps where meetup_id = ${req.params.meetupId} AND user_id = ${req.authData.id}`)
      .then((foundrsvp) => {
        if (foundrsvp.rowCount === 0) {
          next();
        } else if (foundrsvp.rows[0].response === 'yes') {
          newResponse = 'no';
          changeRsvpMeetup(rsvp, newResponse)
            .then((results) => {
              return res.status(201).json({
                status: 200,
                message: 'Meetup rsvp cancelled',
                data: results.rows[0],
              })
            }).catch(err => (
              res.status(500).json(err)
            ));
        } else {
          newResponse = 'yes';
          changeRsvpMeetup(rsvp, newResponse)
            .then(results => res.status(201).json({
              status: 200,
              message: 'Meetup rsvp successful',
              data: results.rows[0],
            })).catch(err => (
              res.status(500).json(err)
            ));
        }
      }).catch(err => (
        res.status(500).json(err)
      ));
  }
}

export default RsvpValidator;
