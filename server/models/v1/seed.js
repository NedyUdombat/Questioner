import moment from 'moment';
import bcrypt from 'bcryptjs';


const seedTables = {
  meetupsTable: `INSERT INTO meetups(organizer_name, topic, location, happening_on )
    VALUES ('100daysofcode', 'learing', 'uyo', to_date('${moment('2019-11-11').format('YYYY-MM-DD')}', 'YYYY MM DD')),
    ('Freecodecamp', 'DB management', 'Ikeja', to_date('${moment('2019-08-01').format('YYYY-MM-DD')}', 'YYYY MM DD'))
    `,
  usersTable: `INSERT INTO users(firstname, lastname, username, email, password, phonenumber, role)
        VALUES ('nedy', 'udombat', 'nedyy', 'nedyudombat@gmail.com', '${bcrypt.hashSync('Iamtheadmin', 10)}', 07018228593, 'admin'),
        ('Jermaine', 'Umanah', 'Jermaine1', 'jm1@gmail.com', '${bcrypt.hashSync('Iamtheseededuser', 10)}', 08025137999, 'user')
        `,

  questionsTable: `INSERT INTO questions( meetup_id, user_id, title, body)
      VALUES (1, 2, 'hy', 'hy how are you'),
      (2, 1, 'hello', 'I am good')
      `,

  rsvpsTable: `INSERT INTO rsvps (meetup_id, user_id, response)
      VALUES (2, 1, 'yes'),
      (1, 2, 'no')
      `,

  commentsTable: `INSERT INTO comments(user_id, question_id, comment)
        VALUES (2, 1, 'I am fine'),
        (2, 1, 'What a day')
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
