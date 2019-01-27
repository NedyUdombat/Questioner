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
  usersTable: 'INSERT INTO users(firstname, lastname, username, email, password, phonenumber, role)\n        VALUES (\'nedy\', \'udombat\', \'nedyy\', \'nedyudombat@gmail.com\', \'' + _bcryptjs2.default.hashSync('Iamtheadmin', 10) + '\', 07018228593, \'admin\'),\n        (\'Jermaine\', \'Umanah\', \'Jermaine1\', \'jm1@gmail.com\', \'' + _bcryptjs2.default.hashSync('Iamtheseededuser', 10) + '\', 08025137999, \'user\')\n        ',

  questionsTable: 'INSERT INTO questions( meetup_id, user_id, title, body)\n      VALUES (1, 2, \'hy\', \'hy how are you\'),\n      (2, 1, \'hello\', \'I am good\')\n      ',

  rsvpsTable: 'INSERT INTO rsvps (meetup_id, user_id, response)\n      VALUES (2, 1, \'yes\'),\n      (1, 2, \'no\')\n      ',

  commentsTable: 'INSERT INTO comments(user_id, question_id, comment)\n        VALUES (2, 1, \'I am fine\'),\n        (2, 1, \'What a day\')\n        ',

  votesTable: 'INSERT INTO votes(user_id, question_id, vote_type )\n      VALUES (1, 1, \'upvote\'),\n      (1, 2, \'downvote\'),\n      (1, 1, \'upvote\'),\n      (1, 2, \'downvote\'),\n      (1, 1, \'upvote\'),\n      (1, 2, \'downvote\'),\n      (1, 1, \'upvote\'),\n      (1, 2, \'downvote\')\n      '
};

exports.default = seedTables;