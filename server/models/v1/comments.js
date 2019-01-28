import pool from '../../database/dbConfig';

class Comments {
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
}

export default Comments;
