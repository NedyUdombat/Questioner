const mockMeetupDetails = {
  validMeetup: {
    organizerName: 'DevFest',
    topic: 'Web Accessibility',
    happeningOn: '2019-12-12',
    location: 'Uyo, Akwa Ibom State',
  },
  invalidPastMeetup: {
    organizerName: 'DevFest',
    topic: 'Web Accessibility',
    happeningOn: '2018-12-12',
    location: 'Uyo, Akwa Ibom State',
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


const mockQuestionDetails = {
  validQuestion: {
    userId: 1,
    meetupId: 1,
    title: 'GFW not working?',
    body: 'why is GFW not working when I insert TYF in the config file?',
  },
  invalidUserQuestion: {
    userId: 10,
    meetupId: 1,
    title: 'GFW orking?',
    body: 'why is GFW not working when I insert TYF in the config file?',
  },
  invalidFieldQuestion: {
    userId: 1,
    meetupId: 1,
    title: '',
    body: 'why is GFW not workig when I insert TYF in the config file?',
  },
  invalidMeetupQuestion: {
    userId: 1,
    meetupId: 200,
    title: 'GFW not working?',
    body: 'why is GFW nYF in the config file?',
  },
  comment: {
    body: 'hy',
  },
};

const mockRSVPDetails = {
  validRsvp: {
    userId: 1,
    status: 'yes',
  },
  invalidRsvp: {
    userId: 1,
    status: 'yess',
  },
};

const mockVoteDetails = {
  validUpvote: {
    userId: 1,
    voteType: 'upvote',
  },
  validDownvote: {
    userId: 1,
    voteType: 'downvote',
  },
  invalidVoteType: {
    userId: 1,
    voteType: 'te',
  },
  invalidUser: {
    userId: 10,
    voteType: 'te',
  },
};

const userAccounts = {
  validUserAccount: {
    firstname: 'u',
    lastname: 'er',
    othername: '',
    username: 'ers',
    email: 'u@umeil.com',
    password: 'qwerfw',
    phonenumber: '07025137999',
    role: 'user',
  },
  invalidUserAccount: {
    firstname: '',
    lastname: 'er',
    othername: '',
    username: 'ers',
    email: 'u@umeil.com',
    password: 'qwerfw',
    phonenumber: '07025137999',
    role: 'user',
  },
  validAdminAccount: {
    firstname: 'nedy',
    lastname: 'udombat',
    othername: '',
    username: 'nedyy',
    email: 'nedyudombat@gmail.com',
    password: 'Iamtheadmin',
    phonenumber: '0708228593',
    role: 'admin',
  },
  wrongPassword: {
    email: 'nedyudombat@gmail.com',
    password: 'qwerrfghjktyy',
  },
  emptyLoginCredentials: {
    email: '',
    password: 'qwerrfghjktyy',
  },
  nonExistentUser: {
    email: 'nedyety@gmail.com',
    password: 'qwertyy',
  },
};

export {
  mockMeetupDetails, mockQuestionDetails, mockRSVPDetails,
  mockVoteDetails, userAccounts,
};
