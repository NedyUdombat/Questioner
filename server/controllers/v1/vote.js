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
            .then((fullResult) => {
              console.log(fullResult.rows[0]);
              return res.status(201).json({
                status: 201,
                message: `${newVote.newVoteType} successful`,
                data: response.rows[0],
                newVoteAmount: fullResult.rows[0].vote_amount,
              });
            });
        });
    });
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
          .then((results) => {
            pool.query(`SELECT vote_amount FROM questions where id = ${results.rows[0].question_id}`)
              .then((voteAmount) => {
                if (voteType === 'upvote') {
                  const newVoteAmount = voteAmount.rows[0].vote_amount + 1;
                  pool.query(`UPDATE questions SET vote_amount = ${newVoteAmount}  where id = ${results.rows[0].question_id} returning *`)
                    .then((fullResult) => {
                      console.log(fullResult.rows[0]);
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
                      console.log(fullResult.rows[0]);
                      res.status(201).json({
                        status: 201,
                        message: `${voteType} successful`,
                        data: results.rows[0],
                        newVoteAmount: fullResult.rows[0].vote_amount,
                      });
                    });
                }
              });
          })
          .catch(error => res.status(500).json({
            status: 500,
            error,
          }));
      } else if (result.rows[0].vote_type === 'upvote') {
        newVoteType = 'downvote';
        newVote.newVoteType = newVoteType;
        const vAmount = -1;
        changeVote(res, res, newVote, vAmount);
      } else if (result.rows[0].vote_type === 'downvote') {
        newVoteType = 'upvote';
        newVote.newVoteType = newVoteType;
        const vAmount = 1;
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
