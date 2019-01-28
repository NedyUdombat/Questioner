import Vote from '../../models/v1/vote';

const { voteQuestion, getAllVotesByUser } = Vote;


const getAllVotesForQuestion = (req, res, voteType) => {
  const { questionId } = req.params;
  const ids = { userId: req.authData.id, questionId };
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
  const { questionId } = req.params;
  const question = {
    userId: req.authData.id,
    questionId,
    voteType,
  };
  voteQuestion(question)
    .then(results => res.status(201).json({
      status: 201,
      message: 'Upvote successful',
      data: results.rows,
    }))
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
