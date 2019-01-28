import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../../database/dbConfig';
import Comments from '../../models/v1/comments';

dotenv.config();

const secretHash = process.env.SECRET_KEY;

const {
  commentQuestion, getAllComments,
  getAllCommentsForQuestion, getAllCommentsByUser,
} = Comments;


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
    let userId;
    jwt.verify(req.headers['x-access-token'], secretHash, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      userId = decoded.id;
    });
    getAllCommentsByUser(userId)
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
    const jwToken = req.headers['x-access-token'];
    let userId;
    jwt.verify(jwToken, secretHash, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      userId = decoded.id;
    });
    const comment = {
      questionId,
      userId,
      comment: req.body.body,
    };
    pool.query(`SELECT * FROM questions WHERE id = ${questionId}`)
      .then((retreivedQuestion) => {
        if (retreivedQuestion.rowCount > 0) {
          const newData = {
            questionId,
            userId,
            title: retreivedQuestion.rows[0].title,
            body: retreivedQuestion.rows[0].body,
            comment: comment.comment,
          };
          commentQuestion(comment)
            .then((results) => {
              if (results.rowCount > 0) {
                return res.status(201).json({
                  status: 201,
                  message: 'Successfully commented',
                  data: newData,
                });
              }
              return res.json(400).json({
                status: 400,
                error: 'could not comment',
              });
            })
            .catch(error => res.status(500).json({
              status: 500,
              error,
            }));
        }
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }
}

export default CommentController;
