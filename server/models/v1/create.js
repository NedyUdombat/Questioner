const createTables = {
  meetupsTable: `CREATE TABLE IF NOT EXISTS meetups(
      id SERIAL PRIMARY KEY,
      organizer_name VARCHAR not null,
      topic VARCHAR not null,
      location VARCHAR not null,
      happening_On DATE not null,
      tags VARCHAR[],
      images VARCHAR[],
      created_on DATE DEFAULT NOW()
    )`,

  usersTable: `CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(100) not null,
      lastname VARCHAR(100) not null,
      othername VARCHAR(100),
      username VARCHAR(100) not null,
      email VARCHAR(100) UNIQUE not null,
      password VARCHAR(100) not null,
      phonenumber INT,
      role VARCHAR(100) not null,
      registered DATE DEFAULT NOW()
    )`,

  questionsTable: `CREATE TABLE IF NOT EXISTS questions(
      id SERIAL PRIMARY KEY,
      meetup_id INT not null,
      user_id INT not null,
      title VARCHAR not null,
      body VARCHAR not null,
      FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      created_on DATE DEFAULT NOW()
    )`,

  rsvpsTable: `CREATE TABLE IF NOT EXISTS rsvps(
      id SERIAL PRIMARY KEY,
      meetup_id INT not null,
      user_id INT not null,
      response VARCHAR not null,
      FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )`,

  commentsTable: `CREATE TABLE IF NOT EXISTS comments(
      id SERIAL PRIMARY KEY,
      user_id INT not null,
      question_id INT not null,
      comment VARCHAR not null,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
    )`,

  votesTable: `CREATE TYPE type AS ENUM ('upvote', 'downvote');
      CREATE TABLE IF NOT EXISTS votes(
      id SERIAL PRIMARY KEY,
      user_id INT not null,
      question_id INT not null,
      vote_type type,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
    )`,
};

export default createTables;
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
