import moment from 'moment';
import bcrypt from 'bcryptjs';


const seedTables = {
  meetupsTable: `INSERT INTO meetups(organizer_name, topic, location, happening_on, image )
    VALUES ('100daysofcode', 'learing', 'uyo', to_date('${moment('2019-11-11').format('YYYY-MM-DD')}', 'YYYY MM DD'), ''),
    ('Freecodecamp', 'DB management', 'Ikeja', to_date('${moment('2019-08-01').format('YYYY-MM-DD')}', 'YYYY MM DD'), '')
    `,
  usersTable: `INSERT INTO users(firstname, lastname, othername, username, email, password, phonenumber, role)
        VALUES ('nedy', 'udombat', '', 'nedyy', 'nedyudombat@gmail.com', '${bcrypt.hashSync('Iamtheadmin', 10)}', 07018228593, 'admin'),
        ('Jermaine', 'Umanah', 'emmanuel', 'Jermaine1', 'jm1@gmail.com', '${bcrypt.hashSync('Iamtheseededuser', 10)}', 08025137999, 'user')
        `,

  questionsTable: `INSERT INTO questions( meetup_id, user_id, title, body)
      VALUES (1, 2, 'Possessions', 'If you lost all of your possessions but one, what would you want it to be?'),
      (2, 1, 'Creation', 'What have you created that you are most proud of?'),
      (1, 2, 'Interests', 'What are you interested in that most people haven''t heard of?'),
      (2, 1, 'Book', 'What''s your favorite book?'),
      (1, 2, 'Learn', 'What''s something you learned in the last week?'),
      (2, 1, 'Honesty', 'What issue will you always speak your mind about?'),
      (1, 2, 'Accomplishment', 'What dumb accomplishment are you most proud of?'),
      (2, 1, 'Clothe', 'What''s your favorite piece of clothing you own?')
      `,

  rsvpsTable: `INSERT INTO rsvps (meetup_id, user_id, response)
      VALUES (2, 1, 'yes'),
      (1, 2, 'no')
      `,

  commentsTable: `INSERT INTO comments(user_id, question_id, comment)
        VALUES (2, 1, 'I am fine'),
        (1, 1, 'What a day'),
        (2, 2, 'This is amazing'),
        (1, 1, 'LOL'),
        (1, 2, 'Wawu!!'),
        (1, 1, 'Hell No'),
        (2, 2, 'I am learning'),
        (1, 2, 'Im impressed')
        `,

  votesTable: `INSERT INTO votes(user_id, question_id, vote_type )
      VALUES (1, 1, 'upvote'),
      (1, 2, 'downvote'),
      (1, 1, 'upvote'),
      (1, 2, 'downvote'),
      (1, 1, 'upvote'),
      (1, 2, 'downvote'),
      (1, 1, 'upvote'),
      (1, 2, 'downvote')
      `,
};


export default seedTables;
