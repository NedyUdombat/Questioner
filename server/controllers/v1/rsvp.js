import Rsvps from '../../models/v1/rsvps';

const { rsvpMeetup, getAllRsvps } = Rsvps;

class RsvpController {
  static rsvpMeetup(req, res) {
    const id = req.params.meetupId;
    const userId = req.body.userId;
    const rsvp = {
      userId,
      status: req.body.status,
    };
    rsvpMeetup(rsvp, id)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Rsvp meetup successful',
            data: results.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'Could not rsvp for meetup',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error,
      }));
  }

  static getAllRsvps(req, res) {
    const { meetupId } = req.params;
    getAllRsvps(meetupId)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: results.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'no rsvp has been made',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }
}

export default RsvpController;
