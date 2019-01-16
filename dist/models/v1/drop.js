'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dropTables = {
  votesTable: 'DROP TABLE IF EXISTS votes',
  commentsTable: 'DROP TABLE IF EXISTS comments',
  rsvpsTable: 'DROP TABLE IF EXISTS rsvps',
  questionsTable: 'DROP TABLE IF EXISTS questions',
  usersTable: 'DROP TABLE IF EXISTS users',
  meetupsTable: 'DROP TABLE IF EXISTS meetups'
};

exports.default = dropTables;