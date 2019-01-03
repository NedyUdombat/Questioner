import dummyMeetup from '../dummyModel/dummyMeetups';
import Validator from '../_helpers/post_validators';


class MeetupController {
  static getAllMeetups(req, res) {
    console.log(typeof dummyMeetup);
    if (dummyMeetup.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No meetup is available',
      });
    }
    return res.status(200).json({
		  status: 200,
	    data: dummyMeetup,
	  });
  }

  static getSingleMeetup(req, res) {
    const foundMeetup = dummyMeetup.find(meetup => meetup.id === parseInt(req.params.id, 10));

    if (foundMeetup) {
      return res.status(200).json({
        status: 200,
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
      const isHappeningOnYear = happeningOn.getFullYear() >= currentDate.getFullYear();
      const isHappeningOnMonth = happeningOn.getMonth() >= currentDate.getMonth();
      const isHappeningOnDate = happeningOn.getDate() > currentDate.getDate();

      if (isHappeningOnYear) {
        if (isHappeningOnMonth) {
          if (isHappeningOnDate) {
            upcomingMeetups.push(meetup);
          }
        }
      } else {
        return res.status(404).json({
          status: 404,
          message: 'There are no upcoming meetups',
        });
      }
    }

    return res.status(200).json({
      status: 200,
      data: upcomingMeetups,
    });
  }

  static createMeetup(req, res) {
    const { organizer, topic, happeningOn, location, tags, images } = req.body;
    const fields = {
      organizer,
      topic,
      happeningOn,
      location,
    };
    const validator = new Validator();
    validator.validate(fields, 'required|string');
    if (!validator.hasErrors) {
      let isDuplicate = false;

      for (const event of dummyMeetup) {
        isDuplicate = event.topic === fields.topic && event.location === fields.location;
      }
      if (isDuplicate) {
        return res.status(409).json({
          status: 409,
          error: `This event '${fields.topic}' cannot be created twice`,
        });
      }

      const id = dummyMeetup.length + 1;
      const meetupDetail = {
        id,
        organizer,
        topic,
        happeningOn,
        location,
        tags,
        images,
        createdOn: new Date(),
      };
      dummyMeetup.push(meetupDetail);
      return res.status(201).json({
        status: 201,
        message: 'Create meetup successful',
        data: meetupDetail,
      });
    }
    
    return res.status(400).json({
      errorMessages:validator.getErrors()
    });
  }

  static rsvpMeetup(req, res) {
    const { meetupTopic, status } = req.body;
    const validator = new Validator();
    const field = {
      meetupTopic,
    };

    const rsvpStatus = status === 'yes' || status === 'no' || status === 'maybe';

    const errorMessages = validator.validate(field, 'required|string');
    if (errorMessages === true) {
      const foundMeetup = dummyMeetup.find(meetup => meetup.topic === meetupTopic);
      if (foundMeetup) {
        if (rsvpStatus) {
          const meetup = foundMeetup.id;
          const rsvpDetail = {
            meetup,
            topic: meetupTopic,
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
    return res.status(400).json({
      errorMessages,
    });
  }
}

export default MeetupController;
