import moment from 'moment';
import meetups from '../../models/v1/meetups';
// import users from '../../models/v1/users';
import Validator from '../../_helpers/post_validators';

class MeetupController {
  static getAllMeetups(req, res) {
    if (meetups.length > 0) {
      return res.status(200).json({
        status: 200,
        message: 'Successfully retrieved all meetups',
        data: meetups,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'No meetup is available',
    });
  }

  static getSingleMeetup(req, res) {
    const { meetupId } = req.params;
    const foundMeetup = meetups.find(meetup => meetup.id === parseInt(meetupId, 10));

    if (foundMeetup) {
      return res.status(200).json({
        status: 200,
        message: 'Successfully retrieved specific meetup',
        data: foundMeetup,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Meetup record not found',
    });
  }

  static getUpcomingMeetups(req, res) {
    const upcomingMeetups = meetups.filter(meetup => moment(meetup.happeningOn).isAfter(Date.now()));
    if (upcomingMeetups.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'There are no upcoming meetups',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Successfully retrieved all upcoming meetups',
      data: upcomingMeetups,
    });
  }

  static createMeetup(req, res) {
    const { organizer, topic, happeningOn, location, tags, images } = req.body;
    const id = meetups.length + 1;
    const meetupDetail = {
      id, organizer, topic, happeningOn, location, tags, images, createdOn: new Date(),
    };
    meetups.push(meetupDetail);
    return res.status(201).json({
      status: 201,
      message: 'Meetup successfully created',
      data: meetupDetail,
    });
  }

  static rsvpMeetup(req, res) {
    const { status } = req.body;
    const { meetupId } = req.params;
    const foundMeetup = meetups.find(meetup => meetup.id === parseInt(meetupId, 10));
    if (foundMeetup) {
      const rsvpDetail = {
        meetupId: foundMeetup.id,
        topic: foundMeetup.topic,
        location: foundMeetup.location,
        status,
      };
      return res.status(201).json({
        status: 201,
        message: 'Rsvp meetup successful',
        data: rsvpDetail,
      });
    }
    return res.status(404).json({
      error: 'Meetup not found',
    });
  }
}

export default MeetupController;
