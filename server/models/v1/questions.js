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

  static getAllComments() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM comments')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllCommentsForQuestion(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM comments where question_id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllCommentsByUser(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM comments where user_id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static commentQuestion(question) {
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO comments ( question_id, user_id, comment) VALUES (${question.questionId}, ${question.userId}, '${question.comment}') returning *`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllVotesByUser(voteType, id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM votes where vote_type = '${voteType}' AND user_id = ${id.userId} AND question_id = ${id.questionId}`)
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
