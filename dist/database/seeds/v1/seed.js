'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var seedTables = {
  meetupsTable: 'INSERT INTO meetups(organizer_name, topic, location, happening_on )\n    VALUES (\'100daysofcode\', \'learing\', \'uyo\', to_date(\'' + (0, _moment2.default)('2019-11-11').format('YYYY-MM-DD') + '\', \'YYYY MM DD\')),\n    (\'Freecodecamp\', \'DB management\', \'Ikeja\', to_date(\'' + (0, _moment2.default)('2019-08-01').format('YYYY-MM-DD') + '\', \'YYYY MM DD\'))\n    ',
  usersTable: 'INSERT INTO users(firstname, lastname, othername, username, email, password, phonenumber, role)\n        VALUES (\'nedy\', \'udombat\', \'\', \'nedyy\', \'nedyudombat@gmail.com\', \'' + _bcryptjs2.default.hashSync('Iamtheadmin', 10) + '\', 07018228593, \'admin\'),\n        (\'Jermaine\', \'Umanah\', \'emmanuel\', \'Jermaine1\', \'jm1@gmail.com\', \'' + _bcryptjs2.default.hashSync('Iamtheseededuser', 10) + '\', 08025137999, \'user\')\n        ',

  questionsTable: 'INSERT INTO questions( meetup_id, user_id, title, body)\n      VALUES (1, 2, \'Possessions\', \'If you lost all of your possessions but one, what would you want it to be?\'),\n      (2, 1, \'Creation\', \'What have you created that you are most proud of?\'),\n      (1, 2, \'Interests\', \'What are you interested in that most people haven\'\'t heard of?\'),\n      (2, 1, \'Book\', \'What\'\'s your favorite book?\'),\n      (1, 2, \'Learn\', \'What\'\'s something you learned in the last week?\'),\n      (2, 1, \'Honesty\', \'What issue will you always speak your mind about?\'),\n      (1, 2, \'Accomplishment\', \'What dumb accomplishment are you most proud of?\'),\n      (2, 1, \'Clothe\', \'What\'\'s your favorite piece of clothing you own?\')\n      ',

  rsvpsTable: 'INSERT INTO rsvps (meetup_id, user_id, response)\n      VALUES (2, 1, \'yes\'),\n      (1, 2, \'no\')\n      ',

  commentsTable: 'INSERT INTO comments(user_id, question_id, comment)\n        VALUES (2, 1, \'I am fine\'),\n        (1, 1, \'What a day\'),\n        (2, 2, \'This is amazing\'),\n        (1, 1, \'LOL\'),\n        (1, 2, \'Wawu!!\'),\n        (1, 1, \'Hell No\'),\n        (2, 2, \'I am learning\'),\n        (1, 2, \'Im impressed\')\n        ',

  votesTable: 'INSERT INTO votes(user_id, question_id, vote_type )\n      VALUES (1, 1, \'upvote\'),\n      (1, 2, \'downvote\'),\n      (1, 1, \'upvote\'),\n      (1, 2, \'downvote\'),\n      (1, 1, \'upvote\'),\n      (1, 2, \'downvote\'),\n      (1, 1, \'upvote\'),\n      (1, 2, \'downvote\')\n      '
};

exports.default = seedTables;