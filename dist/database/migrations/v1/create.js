"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var createTables = {
    meetupsTable: "CREATE TABLE IF NOT EXISTS meetups(\n      id SERIAL PRIMARY KEY,\n      organizer_name VARCHAR not null,\n      topic VARCHAR not null,\n      location VARCHAR not null,\n      happening_On DATE not null,\n      tags VARCHAR[],\n      image VARCHAR,\n      created_on DATE DEFAULT NOW()\n    )",

    usersTable: "CREATE TABLE IF NOT EXISTS users(\n      id SERIAL PRIMARY KEY,\n      firstname VARCHAR not null,\n      lastname VARCHAR not null,\n      othername VARCHAR,\n      username VARCHAR UNIQUE not null,\n      email VARCHAR UNIQUE not null,\n      password VARCHAR not null,\n      phonenumber VARCHAR,\n      role VARCHAR not null,\n      registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    )",

    questionsTable: "CREATE TABLE IF NOT EXISTS questions(\n      id SERIAL PRIMARY KEY,\n      meetup_id INT not null,\n      user_id INT not null,\n      title VARCHAR not null,\n      body VARCHAR not null,\n      FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE,\n      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n      created_on DATE DEFAULT NOW()\n    )",

    rsvpsTable: "CREATE TABLE IF NOT EXISTS rsvps(\n      id SERIAL PRIMARY KEY,\n      meetup_id INT not null,\n      user_id INT not null,\n      response VARCHAR not null,\n      FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE,\n      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE\n    )",

    commentsTable: "CREATE TABLE IF NOT EXISTS comments(\n      id SERIAL PRIMARY KEY,\n      user_id INT not null,\n      question_id INT not null,\n      comment VARCHAR not null,\n      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n      FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE,\n      created_on DATE DEFAULT NOW()\n    )",

    votesTable: "CREATE TYPE type AS ENUM ('upvote', 'downvote');\n      CREATE TABLE IF NOT EXISTS votes(\n      id SERIAL PRIMARY KEY,\n      user_id INT not null,\n      question_id INT not null,\n      vote_type type,\n      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n      FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE\n    )"
};

exports.default = createTables;