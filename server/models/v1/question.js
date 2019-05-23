import moment from 'moment';
import pool from '../../database/dbConfig';

class Question {
  static getAllQuestions() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM questions ORDER BY vote_amount DESC')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllQuestionsForMeetup(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT *, (SELECT row_to_json(users) FROM (SELECT firstname, lastname, username, id, email FROM users WHERE questions.user_id = users.id) AS users) AS users FROM questions where meetup_id = ${id} ORDER BY vote_amount DESC`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getSpecificQuestionsForMeetupByUser(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM questions where meetup_id = ${id.meetupId} AND user_id = ${id.userId} ORDER BY vote_amount DESC`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllQuestionsByUser(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM questions where user_id = ${id} ORDER BY vote_amount DESC`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getSpecificQuestion(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM questions where id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static askQuestion(question) {
    const createdOn = moment().format();
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO questions ( meetup_id, user_id, title, body, vote_amount, created_on) VALUES (${question.meetupId}, ${question.userId}, '${question.title}', '${question.body}', 0, '${createdOn}') returning *`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Question;
