import dummyMeetup from '../dummyModel/dummyMeetups';
import Validator from '../_helpers/post_validators';

class MeetupController {
  static getAllMeetups(req, res) {
    console.log(typeof dummyMeetup)
    if (dummyMeetup.length === 0) {
      return res.status(404).json({
        status:404,
        message: 'No meetup is available'
      })
    } else {
      return res.status(200).json({
  		  status: 200,
  	    data: dummyMeetup,
  	  });
    }
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
    let upcomingMeetups = [];
    for(let meetup of dummyMeetup) {
      let happeningOn = new Date(meetup.happeningOn);
      let isHappeningOnYear =happeningOn.getFullYear() >= currentDate.getFullYear();
      let isHappeningOnMonth = happeningOn.getMonth() >= currentDate.getMonth();
      let isHappeningOnDate = happeningOn.getDate() > currentDate.getDate();
      
      if (isHappeningOnYear) {
        if (isHappeningOnMonth) {
          if (isHappeningOnDate) {

            upcomingMeetups.push(meetup);
          }
        }
      } else {
        return res.status(404).json({
          status:404,
          message: 'There are no upcoming meetups'
        })
      }
    }

    return res.status(200).json({
      status:200,
      data: upcomingMeetups
    }) 
  }

  static createMeetup(req, res) {
    const { organizer, topic, happeningOn, location, tags, images } = req.body;
    const fields = {
      organizer,
      topic,
      happeningOn,
      location,
    };

    const errorMessages = Validator.validate(fields, 'required|string');
    let isDuplicate = false;

    for (const event of dummyMeetup) {
      isDuplicate = event.topic === fields.topic && event.location === fields.location;
    }
    if (isDuplicate) {
      return res.status(409).json({ 
        status:409,
        error: `This event '${fields.topic}' cannot be created twice` 
      });
    }

    if (errorMessages === true) {
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
    } else {
      return res.status(400).json({
        errorMessages,
      });
    }
  }

  static rsvpMeetup(req, res) {
    const { meetupTopic, status } = req.body;
    
    const field = {
      meetupTopic,
    }

    let rsvpStatus = status === 'yes' ||  status === 'no' || status === 'maybe'

    const errorMessages = Validator.validate(field, 'required|string');
    if (errorMessages === true) {
      const foundMeetup = dummyMeetup.find(meetup => meetup.topic === meetupTopic);
      if (foundMeetup) {        
        if (rsvpStatus) {
          let meetup = foundMeetup.id;
          const rsvpDetail = {
            meetup,
            topic : meetupTopic,
            status,
          }
          return res.status(201).json({
            status: 201,
            message: 'Rsvp meetup successful',
            data: rsvpDetail,
          })
        } else {
          return res.status(400).json({
            error: 'Rsvp should be yes, no, or maybe'
          })
        }
      } else {
         return res.status(404).json({
          error: 'Meetup not found'
        })
      }
    } else {
      return res.status(400).json({
        errorMessages,
      });
    }    
  }
}

export default MeetupController;
