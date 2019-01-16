'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import pool from './dbConfig';


var dropTables = {
  votesTable: 'DROP TABLE IF EXISTS votes',
  commentsTable: 'DROP TABLE IF EXISTS comments',
  rsvpsTable: 'DROP TABLE IF EXISTS rsvps',
  questionsTable: 'DROP TABLE IF EXISTS questions',
  usersTable: 'DROP TABLE IF EXISTS users',
  meetupsTable: 'DROP TABLE IF EXISTS meetups'
};

exports.default = dropTables;

// pool.query('DROP TABLE IF EXISTS votes');
// pool.query('DROP TABLE IF EXISTS comments');
// pool.query('DROP TABLE IF EXISTS questions');
// pool.query('DROP TABLE IF EXISTS users');
// pool.query('DROP TABLE IF EXISTS meetups');