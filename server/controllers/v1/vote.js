import Vote from '../../models/v1/vote';

const { voteQuestion, getAllVotesForQuestion,
  checkForDuplicateVoteByUser, changeVoteByUserForQuestion,
} = Vote;


const getAllVotesForQuestionFunction = (req, res, voteType) => {
  const { questionId } = req.params;
  getAllVotesForQuestion(voteType, questionId)
    .then(results => res.status(200).json({
      status: 200,
      voteType,
      amount: results.rowCount,
    }))
    .catch(error => res.status(400).json({
      status: 400,
      error: error.message,
    }));
};

const voter = (req, res, voteType) => {
  const { questionId } = req.params;
  const userId = req.authData.id;
  let newVoteType;
  const vote = { userId, questionId, voteType };
  const newVote = { userId, questionId };
  const ids = { userId, questionId };
  checkForDuplicateVoteByUser(ids)
    .then((result) => {
      if (result.rowCount === 0) {
        voteQuestion(vote)
          .then(results => res.status(201).json({
            status: 201,
            message: `${voteType} successful`,
            data: results.rows,
          }))
          .catch(error => res.status(500).json({
            status: 500,
            error,
          }));
      } else if (result.rows[0].vote_type === 'upvote') {
        newVoteType = 'downvote';
        newVote.newVoteType = newVoteType;
        changeVoteByUserForQuestion(newVote)
          .then(response => res.status(201).json({
            status: 201,
            message: `${newVoteType} successful`,
            data: response.rows,
          }));
      } else if (result.rows[0].vote_type === 'downvote') {
        newVoteType = 'upvote';
        newVote.newVoteType = newVoteType;
        changeVoteByUserForQuestion(newVote)
          .then(response => res.status(201).json({
            status: 201,
            message: `${newVoteType} successful`,
            data: response.rows,
          }));
      }
    });
};

class VoteController {
  static upVote(req, res) {
    const voteType = 'upvote';
    voter(req, res, voteType);
  }

  static downVote(req, res) {
    const voteType = 'downvote';
    voter(req, res, voteType);
  }

  static getAllUpvoteForQuestion(req, res) {
    const voteType = 'upvote';
    getAllVotesForQuestionFunction(req, res, voteType);
  }

  static getAllDownvoteForQuestion(req, res) {
    const voteType = 'downvote';
    getAllVotesForQuestionFunction(req, res, voteType);
  }
}

export default VoteController;
