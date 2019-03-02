import pool from '../../database/dbConfig';
import Comment from '../../models/v1/comment';
import User from '../../models/v1/user';

const {
  commentQuestion, getAllComments,
  getAllCommentsForQuestion, getAllCommentsByUser,
} = Comment;

const { getSpecificUser } = User;

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
            amount: comments.rowCount,
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'No comments For this question',
          amount: 0,
        });
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }

  static getAllCommentsByUser(req, res) {
    const userId = req.authData.id;
    getSpecificUser(userId)
      .then((user) => {
        const userDetails = {
          fullname: `${user.rows[0].firstname} ${user.rows[0].lastname}`,
          username: user.rows[0].username,
        };
        getAllCommentsByUser(userId)
          .then((comments) => {
            if (comments.rowCount > 0) {
              return res.status(200).json({
                status: 200,
                message: 'Successfully retreived all your comments',
                data: comments.rows,
                userDetails,
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
      })
      .catch(error => res.status(500).json({ status: 500, error }));
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
              comment: results.rows,
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
