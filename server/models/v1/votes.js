import pool from '../../database/dbConfig';

class Vote {
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

export default Vote;
