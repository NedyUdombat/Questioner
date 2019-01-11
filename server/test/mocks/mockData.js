const mockMeetupDetails = {
  validMeetup: {
    isAdmin: true,
    organizer: 'DevFest',
    topic: 'Web Accessibility',
    happeningOn: '12/12/19',
    location: 'Uyo, Akwa Ibom State',
    tags: ['Tech', 'Edu'],
    images: 'jpeg.png',

  },
  invalidPastMeetup: {
    isAdmin: true,
    organizer: 'DevFest',
    topic: 'Web Accessibility',
    happeningOn: '12/12/12',
    location: 'Uyo, Akwa Ibom State',
    tags: ['Tech', 'Edu'],
    images: 'jpeg.png',

  },
  nonAdminMeetup: {
    isAdmin: false,
    organizer: 'DevFest',
    topic: 'Web Accessibility',
    happeningOn: '12/12/12',
    location: 'Uyo, Akwa Ibom State',
    tags: ['Tech', 'Edu'],
    images: 'jpeg.png',

  },
  emptyFieldMeetup: {
    isAdmin: true,
    organizer: '',
    topic: 'Web Accessibility',
    happeningOn: '12/12/12',
    location: 'Uyo, Akwa Ibom State',
    tags: ['Tech', 'Edu'],
    images: 'jpeg.png',
  },
};

const mockEmptyUpcomingMeetups = [];

const mockQuestionDetails = {
  validQuestion: {
    user: 'nedyy',
    meetup: 'Web Accessibility',
    title: 'GFW not working?',
    body: 'why is GFW not working when I insert TYF in the config file?',
  },
  invalidUserQuestion: {
    user: 'nedyyy',
    meetup: 'Web Accessibility',
    title: 'GFW not working?',
    body: 'why is GFW not working when I insert TYF in the config file?',
  },
  invalidFieldQuestion: {
    user: '',
    meetup: 'Web Accessibility',
    title: 'GFW not working?',
    body: 'why is GFW not working when I insert TYF in the config file?',
  },
  invalidMeetupQuestion: {
    user: 'nedyy',
    meetup: 'Web A',
    title: 'GFW not working?',
    body: 'why is GFW not working when I insert TYF in the config file?',
  },
};

const mockRSVPDetails = {
  validRsvp: {
    status: 'yes',
  },
  invalidRsvp: {
    status: 'yess',
  },
};

const mockVoteDetails = {
  validVoter: {
    user: 'nedyy',
  },
  invalidVoter: {
    user: 'nedyey',
  },
  invalidVoterDataType: {
    user: 3,
  },
};

export { mockMeetupDetails, mockQuestionDetails, mockRSVPDetails, mockVoteDetails, mockEmptyUpcomingMeetups };
