import Rsvps from '../../models/v1/rsvps';

const { rsvpMeetup, getAllRsvps,
  getAllRsvpsForMeetup, getAllRsvpsByUser,
} = Rsvps;

class RsvpController {
  static rsvpMeetup(req, res) {
    const rsvp = {
      meetupId: req.params.meetupId,
      userId: req.authData.id,
      status: req.body.status,
    };
    rsvpMeetup(rsvp)
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
    getAllRsvps()
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all rsvps',
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

  static getAllRsvpsForMeetup(req, res) {
    const { meetupId } = req.params;
    getAllRsvpsForMeetup(meetupId)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all rsvps for this meetup',
            data: results.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'no rsvp has been made for this meetup',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static getAllRsvpsByUser(req, res) {
    const userId = req.authData.id;
    getAllRsvpsByUser(userId)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: results.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'you have no rsvps',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }
}

export default RsvpController;
