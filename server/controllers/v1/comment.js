import pool from '../../database/dbConfig';
import Comment from '../../models/v1/comment';

const {
  commentQuestion, getAllComments,
  getAllCommentsForQuestion, getAllCommentsByUser,
} = Comment;


class CommentController {
  static getAllComments(req, res) {
    getAllComments()
      .then((comments) => {
        if (comments.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retreived all comments',
            data: comments.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'No comments',
        });
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }

  static getAllCommentsForQuestion(req, res) {
    const { questionId } = req.params;
    getAllCommentsForQuestion(questionId)
      .then((comments) => {
        if (comments.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retreived all comments',
            data: comments.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'No comments For this question',
        });
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }

  static getAllCommentsByUser(req, res) {
    const { id } = req.authData;
    const userId = id;
    getAllCommentsByUser(userId)
      .then((comments) => {
        if (comments.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retreived all your comments',
            data: comments.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'No comments For this user',
        });
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }

  static commentQuestion(req, res) {
    const questionId = parseInt(req.params.questionId, 10);
    const { id } = req.authData;
    const userId = id;
    const comment = {
      questionId,
      userId,
      comment: req.body.body,
    };
    pool.query(`SELECT * FROM questions WHERE id = ${questionId}`)
      .then((retreivedQuestion) => {
        commentQuestion(comment)
          .then((results) => {
            const newData = {
              questionId,
              userId,
              title: retreivedQuestion.rows[0].title,
              body: retreivedQuestion.rows[0].body,
              comment: results.rows[0].comment,
            };
            return res.status(201).json({
              status: 201,
              message: 'Successfully commented',
              data: newData,
            });
          })
          .catch(error => res.status(500).json({
            status: 500,
            error,
          }));
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }
}

export default CommentController;
