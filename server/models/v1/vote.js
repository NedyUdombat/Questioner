import pool from '../../database/dbConfig';

class Vote {
  static getAllVotesForQuestion(voteType, id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM votes where vote_type = '${voteType}' AND question_id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static checkForDuplicateVoteByUser(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM votes where user_id = ${id.userId} AND question_id = ${id.questionId}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static changeVoteByUserForQuestion(question) {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE votes  SET vote_type = '${question.newVoteType}' where user_id = ${question.userId} AND question_id = ${question.questionId} returning *`)
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

export default Vote;
