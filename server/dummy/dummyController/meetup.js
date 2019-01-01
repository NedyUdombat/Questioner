import dummyMeetup from '../dummyModel/dummyMeetups';

class MeetupController {
  // Get all Meetups
  static getAllMeetups(req, res) {
    return res.status(200).json({
		 	status : 200,
		  data:dummyMeetup,
	  });
  }

  static getSingleMeetup(req, res) {
    // const findMeetup = dummyMeetup.find(singleDummyMeetup => dummyMeetup.id === parseInt(req.params.id, 10));
    const meetupId = req.params.id;
    console.log(meetupId);
    let foundMeetup = false;
    let data;

    dummyMeetup.map((meetup) => {
    	if (meetup.id === Number(meetupId)) {
    		data = meetup;
    		foundMeetup = true;
    		return true;
    	}
    	return false;
    });
    if (foundMeetup) {
      return res.status(200).json({
        status : 200,
        data,
      });
    }
    return res.status(404).json({
    	status : 404,
      message: 'Meetup record not found',
    });
  }
}
export default MeetupController;
