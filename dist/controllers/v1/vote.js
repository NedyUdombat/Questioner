'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vote = require('../../models/v1/vote');

var _vote2 = _interopRequireDefault(_vote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var voteQuestion = _vote2.default.voteQuestion,
    getAllVotesForQuestion = _vote2.default.getAllVotesForQuestion,
    checkForDuplicateVoteByUser = _vote2.default.checkForDuplicateVoteByUser,
    changeVoteByUserForQuestion = _vote2.default.changeVoteByUserForQuestion;


var getAllVotesForQuestionFunction = function getAllVotesForQuestionFunction(req, res, voteType) {
  var questionId = req.params.questionId;

  getAllVotesForQuestion(voteType, questionId).then(function (results) {
    return res.status(200).json({
      status: 200,
      voteType: voteType,
      amount: results.rowCount
    });
  }).catch(function (error) {
    return res.status(400).json({
      status: 400,
      error: error.message
    });
  });
};

var voter = function voter(req, res, voteType) {
  var questionId = req.params.questionId;

  var userId = req.authData.id;
  var newVoteType = void 0;
  var vote = { userId: userId, questionId: questionId, voteType: voteType };
  var newVote = { userId: userId, questionId: questionId };
  var ids = { userId: userId, questionId: questionId };
  checkForDuplicateVoteByUser(ids).then(function (result) {
    if (result.rowCount === 0) {
      voteQuestion(vote).then(function (results) {
        return res.status(201).json({
          status: 201,
          message: voteType + ' successful',
          data: results.rows
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 500,
          error: error
        });
      });
    } else if (result.rows[0].vote_type === 'upvote') {
      newVoteType = 'downvote';
      newVote.newVoteType = newVoteType;
      changeVoteByUserForQuestion(newVote).then(function (response) {
        return res.status(201).json({
          status: 201,
          message: newVoteType + ' successful',
          data: response.rows
        });
      });
    } else if (result.rows[0].vote_type === 'downvote') {
      newVoteType = 'upvote';
      newVote.newVoteType = newVoteType;
      changeVoteByUserForQuestion(newVote).then(function (response) {
        return res.status(201).json({
          status: 201,
          message: newVoteType + ' successful',
          data: response.rows
        });
      });
    }
  });
};

var VoteController = function () {
  function VoteController() {
    _classCallCheck(this, VoteController);
  }

  _createClass(VoteController, null, [{
    key: 'upVote',
    value: function upVote(req, res) {
      var voteType = 'upvote';
      voter(req, res, voteType);
    }
  }, {
    key: 'downVote',
    value: function downVote(req, res) {
      var voteType = 'downvote';
      voter(req, res, voteType);
    }
  }, {
    key: 'getAllUpvoteForQuestion',
    value: function getAllUpvoteForQuestion(req, res) {
      var voteType = 'upvote';
      getAllVotesForQuestionFunction(req, res, voteType);
    }
  }, {
    key: 'getAllDownvoteForQuestion',
    value: function getAllDownvoteForQuestion(req, res) {
      var voteType = 'downvote';
      getAllVotesForQuestionFunction(req, res, voteType);
    }
  }]);

  return VoteController;
}();

exports.default = VoteController;