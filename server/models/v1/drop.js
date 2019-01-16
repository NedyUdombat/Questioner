// import pool from './dbConfig';


const dropTables = {
  votesTable: 'DROP TABLE IF EXISTS votes',
  commentsTable: 'DROP TABLE IF EXISTS comments',
  rsvpsTable: 'DROP TABLE IF EXISTS rsvps',
  questionsTable: 'DROP TABLE IF EXISTS questions',
  usersTable: 'DROP TABLE IF EXISTS users',
  meetupsTable: 'DROP TABLE IF EXISTS meetups',
};

export default dropTables;

// pool.query('DROP TABLE IF EXISTS votes');
// pool.query('DROP TABLE IF EXISTS comments');
// pool.query('DROP TABLE IF EXISTS questions');
// pool.query('DROP TABLE IF EXISTS users');
// pool.query('DROP TABLE IF EXISTS meetups');
