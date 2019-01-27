import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../../models/v1/dbConfig';
import Questions from '../../models/v1/questions';

dotenv.config();

const secretHash = process.env.SECRET_KEY;

const {
  getAllQuestions, askQuestion, voteQuestion, getAllVotesByUser, commentQuestion,
} = Questions;

class QuestionController {
  static getAllQuestions(req, res) {
    getAllQuestions()
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            data: results.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'No question has been asked so far',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static createQuestion(req, res) {
    const meetupId = req.body.meetupId;
    const jwToken = req.headers['x-access-token'];
    let userId;
    jwt.verify(jwToken, secretHash, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      userId = decoded.id;
    });
    const question = {
      meetupId,
      userId,
      title: req.body.title,
      body: req.body.body,
    };
    askQuestion(question)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Question asked successfully',
            data: results.rows,
          });
        }
        return res.json(400).json({
          status: 400,
          error: 'Question could not be asked',
        });
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }

  static upVote(req, res) {
    const questionId = req.params.questionId;
    const jwToken = req.headers['x-access-token'];
    let userId;
    jwt.verify(jwToken, secretHash, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      userId = decoded.id;
    });
    const question = {
      userId,
      questionId,
      voteType: 'upvote',
    };
    voteQuestion(question)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Upvote successful',
            data: results.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          message: 'Question upvote unsuccessful',
        });
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }

  static downVote(req, res) {
    const questionId = req.params.questionId;
    const jwToken = req.headers['x-access-token'];
    let userId;
    jwt.verify(jwToken, secretHash, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      userId = decoded.id;
    });
    const question = {
      userId,
      questionId,
      voteType: 'downvote',
    };
    voteQuestion(question)
      .then((results) => {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Question downvote successful',
            data: results.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          message: 'Question downvote unsuccessful',
        });
      })
      .catch(error => res.status(500).json({
        status: 500,
        error,
      }));
  }

  static getAllUpvoteForQuestion(req, res) {
    const questionId = req.params.questionId;
    const jwToken = req.headers['x-access-token'];
    let userId;
    jwt.verify(jwToken, secretHash, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      userId = decoded.id;
    });
    const ids = { userId, questionId };
    const voteType = 'upvote';
    getAllVotesByUser(voteType, ids)
      .then(results => res.status(200).json({
        status: 200,
        upvote: results.rowCount,
      }))
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static getAllDownvoteForQuestion(req, res) {
    const questionId = req.params.questionId;
    const jwToken = req.headers['x-access-token'];
    let userId;
    jwt.verify(jwToken, secretHash, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      userId = decoded.id;
    });
    const ids = { userId, questionId };
    const voteType = 'downvote';
    getAllVotesByUser(voteType, ids)
      .then(results => res.status(200).json({
        status: 200,
        downvote: results.rowCount,
      }))
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
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

export default QuestionController;
