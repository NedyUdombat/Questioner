import Vote from '../../models/v1/vote';
import pool from '../../database/dbConfig';

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

const changeVote = (req, res, newVote, vAmount) => {
  changeVoteByUserForQuestion(newVote)
    .then((response) => {
      pool.query(`SELECT vote_amount FROM questions where id = ${response.rows[0].question_id}`)
        .then((voteAmount) => {
          const newVoteAmount = voteAmount.rows[0].vote_amount + vAmount;
          pool.query(`UPDATE questions SET vote_amount = ${newVoteAmount}  where id = ${response.rows[0].question_id} returning *`)
            .then(fullResult => res.status(201).json({
              status: 201,
              message: `${newVote.newVoteType} successful`,
              data: response.rows[0],
              newVoteAmount: fullResult.rows[0].vote_amount,
            }));
        });
    });
};

const voter = (req, res, voteType) => {
  const { questionId } = req.params;
  const userId = req.authData.id;
  const vote = { userId, questionId, voteType };
  const newVote = { userId, questionId };
  const ids = { userId, questionId };
  checkForDuplicateVoteByUser(ids)
    .then((result) => {
      if (result.rowCount === 0) {
        voteQuestion(vote)
          .then((results) => {
            pool.query(`SELECT vote_amount FROM questions where id = ${results.rows[0].question_id}`)
              .then((voteAmount) => {
                if (voteType === 'upvote') {
                  const newVoteAmount = voteAmount.rows[0].vote_amount + 1;
                  pool.query(`UPDATE questions SET vote_amount = ${newVoteAmount}  where id = ${results.rows[0].question_id} returning *`)
                    .then((fullResult) => {
                      res.status(201).json({
                        status: 201,
                        message: `${voteType} successful`,
                        data: results.rows[0],
                        newVoteAmount: fullResult.rows[0].vote_amount,
                      });
                    });
                } else {
                  const newVoteAmount = voteAmount.rows[0].vote_amount - 1;
                  pool.query(`UPDATE questions SET vote_amount = ${newVoteAmount}  where id = ${results.rows[0].question_id} returning *`)
                    .then((fullResult) => {
                      res.status(201).json({
                        status: 201,
                        message: `${voteType} successful`,
                        data: results.rows[0],
                        newVoteAmount: fullResult.rows[0].vote_amount,
                      });
                    });
                }
              });
          });
      } else if (result.rows[0].vote_type === voteType) {
        res.status(409).json({
          status: 409,
          message: `You cannot ${voteType} a question twice`,
        });
      } else if (result.rows[0].vote_type === 'downvote') {
        newVote.newVoteType = voteType;
        const vAmount = +1;
        changeVote(res, res, newVote, vAmount);
      } else if (result.rows[0].vote_type === 'upvote') {
        newVote.newVoteType = voteType;
        const vAmount = -1;
        changeVote(res, res, newVote, vAmount);
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
