'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mockMeetupDetails = {
  validMeetup: {
    username: 'admin',
    organizer: 'DevFest',
    topic: 'Web Accessibility',
    happeningOn: '12/12/12',
    location: 'Uyo, Akwa Ibom State',
    Tags: ['Tech', 'Edu'],
    images: ['jpeg.png', 'nn.jpg']

  },
  nonAdminMeetup: {
    username: 'nedyy',
    organizer: 'DevFest',
    topic: 'Web Accessibility',
    happeningOn: '12/12/12',
    location: 'Uyo, Akwa Ibom State',
    Tags: ['Tech', 'Edu'],
    images: ['jpeg.png', 'nn.jpg']

  },
  emptyFieldMeetup: {
    id: 1,
    organizer: 'DevFest',
    topic: '',
    happeningOn: '12/12/12',
    location: 'Uyo, Akwa Ibom State',
    Tags: ['Tech', 'Edu'],
    images: ['jpeg.png', 'nn.jpg'],
    createdOn: new Date()
  }
};

var mockEmptyUpcomingMeetups = [];

var mockQuestionDetails = {
  validQuestion: {
    user: 'nedyy',
    meetup: 'Web Accessibility',
    title: 'GFW not working?',
    body: 'why is GFW not working when I insert TYF in the config file?'
  },
  invalidUserQuestion: {
    user: 'nedyyy',
    meetup: 'Web Accessibility',
    title: 'GFW not working?',
    body: 'why is GFW not working when I insert TYF in the config file?'
  },
  invalidFieldQuestion: {
    user: '',
    meetup: 'Web Accessibility',
    title: 'GFW not working?',
    body: 'why is GFW not working when I insert TYF in the config file?'
  },
  invalidMeetupQuestion: {
    user: 'nedyy',
    meetup: 'Web A',
    title: 'GFW not working?',
    body: 'why is GFW not working when I insert TYF in the config file?'
  }
};

var mockRSVPDetails = {
  validRsvp: {
    status: 'yes'
  },
  invalidRsvp: {
    status: 'yess'
  }
};

var mockVoteDetails = {
  validVoter: {
    user: 'nedyy'
  },
  invalidVoter: {
    user: 'nedyey'
  },
  invalidVoterDataType: {
    user: 3
  }
};

exports.mockMeetupDetails = mockMeetupDetails;
exports.mockQuestionDetails = mockQuestionDetails;
exports.mockRSVPDetails = mockRSVPDetails;
exports.mockVoteDetails = mockVoteDetails;
exports.mockEmptyUpcomingMeetups = mockEmptyUpcomingMeetups;