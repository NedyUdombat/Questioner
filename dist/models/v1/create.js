"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var createTables = {
    meetupsTable: "CREATE TABLE IF NOT EXISTS meetups(\n      id SERIAL PRIMARY KEY,\n      topic VARCHAR not null,\n      organizer_name VARCHAR(100) not null,\n      location VARCHAR not null,\n      happening_On DATE,\n      tags VARCHAR[],\n      images VARCHAR[],\n      created_on DATE DEFAULT NOW()\n    )",

    usersTable: "CREATE TABLE IF NOT EXISTS users(\n      id SERIAL PRIMARY KEY,\n      firstname VARCHAR(100) not null,\n      lastname VARCHAR(100) not null,\n      othername VARCHAR(100) not null,\n      username VARCHAR(100) UNIQUE not null,\n      email VARCHAR(100) not null,\n      password VARCHAR(100) not null,\n      phonenumber INT,\n      role VARCHAR(100) not null,\n      registered DATE DEFAULT NOW()\n    )",

    questionsTable: "CREATE TABLE IF NOT EXISTS questions(\n      id SERIAL PRIMARY KEY,\n      meetup_id INT not null,\n      user_id INT not null,\n      title VARCHAR not null,\n      body VARCHAR not null,\n      FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE,\n      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n      created_on DATE DEFAULT NOW()\n    )",

    rsvpsTable: "CREATE TABLE IF NOT EXISTS rsvps(\n      id SERIAL PRIMARY KEY,\n      meetup_id INT not null,\n      user_id INT not null,\n      response VARCHAR not null,\n      FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE,\n      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE\n    )",

    commentsTable: "CREATE TABLE IF NOT EXISTS comments(\n      id SERIAL PRIMARY KEY,\n      user_id INT not null,\n      question_id INT not null,\n      comment VARCHAR not null,\n      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n      FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE\n    )",

    votesTable: "CREATE TABLE IF NOT EXISTS votes(\n      id SERIAL PRIMARY KEY,\n      user_id INT not null,\n      question_id INT not null,\n      type VARCHAR[] not null,\n      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n      FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE\n    )"
};

exports.default = createTables;
// migration.createMeetups()
//   .then((results) => {
//     return results;
//   })
//   .then((results) => {
//     return migration.createUsers()
//   })
//   .then((results) => {
//     return migration.createQuestion();
//   })
//   .then((results) => {
//     return migration.createRsvp();
//   })
//   .then((results) => {
//     return migration.createVote();
//   })
//   .then((results) => {
//     console.log('got here...')
//     return migration.createComment();
//   })