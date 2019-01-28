import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Vote from '../../models/v1/votes';

dotenv.config();

const secretHash = process.env.SECRET_KEY;

const { voteQuestion, getAllVotesByUser } = Vote;


const getAllVotesForQuestion = (req, res, voteType) => {
  const questionId = req.params.questionId;
  let userId;
  jwt.verify(req.headers['x-access-token'], secretHash, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    userId = decoded.id;
  });
  const ids = { userId, questionId };
  getAllVotesByUser(voteType, ids)
    .then(results => res.status(200).json({
      status: 200,
      upvote: results.rowCount,
    }))
    .catch(error => res.status(400).json({
      status: 400,
      error: error.message,
    }));
};

const vote = (req, res, voteType) => {
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
    voteType,
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
};

class VoteController {
  static upVote(req, res) {
    const voteType = 'upvote';
    vote(req, res, voteType);
  }

  static downVote(req, res) {
    const voteType = 'downvote';
    vote(req, res, voteType);
  }

  static getAllUpvoteForQuestion(req, res) {
    const voteType = 'upvote';
    getAllVotesForQuestion(req, res, voteType);
  }

  static getAllDownvoteForQuestion(req, res) {
    const voteType = 'downvote';
    getAllVotesForQuestion(req, res, voteType);
  }
}

export default VoteController;
