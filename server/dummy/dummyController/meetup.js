import dummyMeetup from '../dummyModel/dummyMeetups';
import dummyUser from '../dummyModel/dummyUser';
import Validator from '../_helpers/post_validators';

class MeetupController {
  static getAllMeetups(req, res) {
    if (dummyMeetup.length > 0) {
      return res.status(200).json({
        status: 200,
        message: 'Successfully retrieved all meetups',
        data: dummyMeetup,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'No meetup is available',
    });
  }

  static getSingleMeetup(req, res) {
    const foundMeetup = dummyMeetup.find(meetup => meetup.id === parseInt(req.params.id, 10));

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
    const currentDate = new Date();
    const upcomingMeetups = [];
    for (const meetup of dummyMeetup) {
      const happeningOn = new Date(meetup.happeningOn);
      if (happeningOn.getFullYear() === currentDate.getFullYear()) {
        if (happeningOn.getMonth() > currentDate.getMonth()) {
          upcomingMeetups.push(meetup);
        } else if (happeningOn.getMonth() === currentDate.getMonth()) {
          if (happeningOn.getDate() > currentDate.getDate()) {
            upcomingMeetups.push(meetup);
          }
        }
      } else if (happeningOn.getFullYear() > currentDate.getFullYear()) {
        upcomingMeetups.push(meetup);
      }
    }
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
    const { organizer, topic, happeningOn, location, tags, images, username } = req.body;
    const fields = { organizer, topic, happeningOn, location, username };
    const validator = new Validator();
    validator.validate(fields, 'required|string');
    if (!validator.hasErrors) {
      const foundUser = dummyUser.find(user => user.username === req.body.username);
      if (foundUser.isAdmin === false) {
        return res.status(401).json({
          status: 401,
          error: 'Only an Admin can create meetups',
        });
      }
      let isDuplicate = false;
      for (const event of dummyMeetup) {
        isDuplicate = event.topic === fields.topic && event.location === fields.location;
      }
      if (isDuplicate) {
        return res.status(409).json({ status: 409, error: `This event '${fields.topic}' cannot be created twice` });
      }
      const id = dummyMeetup.length + 1;
      const meetupDetail = { id, organizer, topic, happeningOn, location, tags, images, createdOn: new Date() };
      dummyMeetup.push(meetupDetail);
      return res.status(201).json({
        status: 201,
        message: 'Meetup successfully created',
        data: meetupDetail,
      });
    }
    return res.status(400).json({ errorMessages: validator.getErrors() });
  }

  static rsvpMeetup(req, res) {
    let { status } = req.body;
    status = status.toLowerCase();
    const rsvpStatus = status === 'yes' || status === 'no' || status === 'maybe';
    const foundMeetup = dummyMeetup.find(meetup => meetup.id === parseInt(req.params.id, 10));
    if (foundMeetup) {
      if (rsvpStatus) {
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
      return res.status(400).json({
        error: 'Rsvp should be yes, no, or maybe',
      });
    }
    return res.status(404).json({
      error: 'Meetup not found',
    });
  }
}

export default MeetupController;
