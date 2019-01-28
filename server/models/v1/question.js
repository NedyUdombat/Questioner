import moment from 'moment';
import pool from '../../database/dbConfig';

class Question {
  static getAllQuestions() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM questions')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllQuestionsForMeetup(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM questions where meetup_id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllQuestionsByUser(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM questions where user_id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static askQuestion(question) {
    const createdOn = moment().format();
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO questions ( meetup_id, user_id, title, body, created_on) VALUES (${question.meetupId}, ${question.userId}, '${question.title}', '${question.body}', '${createdOn}') returning *`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Question;
