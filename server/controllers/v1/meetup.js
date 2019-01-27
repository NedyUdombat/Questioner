import Meetup from '../../models/v1/meetups';

const { getAll, getSpecific, getUpcoming, create, deleteSpecific, deleteAllMeetups } = Meetup;

class MeetupController {
  static getAllMeetups(req, res) {
    getAll()
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all meetups',
            data: results.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'No meetups is available',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static getSingleMeetup(req, res) {
    const { meetupId } = req.params;
    getSpecific(meetupId)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved specific meetup',
            data: results.rows[0],
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'Meetup Record not found',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static getUpcomingMeetups(req, res) {
    getUpcoming()
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all upcoming meetups',
            data: results.rows,
          });
        }
        return res.status(200).json({
          status: 200,
          error: 'There are no upcoming meetups',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static createMeetup(req, res) {
    const meetupsDetails = req.body;
    create(meetupsDetails)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Meetup creation successful',
            data: results.rows,
          });
        }
        return res.status(500).json({
          status: 500,
          error: 'Meetup creation failed',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static deleteAllMeetups(req, res) {
    deleteAllMeetups()
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully deleted all meetups',
            data: results.rows[0],
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'Meetup Record not found',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static deleteSingleMeetup(req, res) {
    const { meetupId } = req.params;
    deleteSpecific(meetupId)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully deleted specific meetup',
            data: results.rows[0],
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'Meetup Record not found',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }
}

export default MeetupController;
