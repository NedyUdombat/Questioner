import moment from 'moment';
import pool from './dbConfig';

class Questions {
  static getAllQuestions() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM questions')
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

  static voteQuestion(question) {
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO votes (user_id, question_id, vote_type) VALUES (${question.userId}, ${question.questionId}, '${question.voteType}') returning *`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Questions;
