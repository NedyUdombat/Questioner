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
    getAllVotesByUser = _vote2.default.getAllVotesByUser;


var getAllVotesForQuestion = function getAllVotesForQuestion(req, res, voteType) {
  var questionId = req.params.questionId;

  var ids = { userId: req.authData.id, questionId: questionId };
  getAllVotesByUser(voteType, ids).then(function (results) {
    return res.status(200).json({
      status: 200,
      upvote: results.rowCount
    });
  }).catch(function (error) {
    return res.status(400).json({
      status: 400,
      error: error.message
    });
  });
};

var vote = function vote(req, res, voteType) {
  var questionId = req.params.questionId;

  var question = {
    userId: req.authData.id,
    questionId: questionId,
    voteType: voteType
  };
  voteQuestion(question).then(function (results) {
    return res.status(201).json({
      status: 201,
      message: 'Upvote successful',
      data: results.rows
    });
  }).catch(function (error) {
    return res.status(500).json({
      status: 500,
      error: error
    });
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
      vote(req, res, voteType);
    }
  }, {
    key: 'downVote',
    value: function downVote(req, res) {
      var voteType = 'downvote';
      vote(req, res, voteType);
    }
  }, {
    key: 'getAllUpvoteForQuestion',
    value: function getAllUpvoteForQuestion(req, res) {
      var voteType = 'upvote';
      getAllVotesForQuestion(req, res, voteType);
    }
  }, {
    key: 'getAllDownvoteForQuestion',
    value: function getAllDownvoteForQuestion(req, res) {
      var voteType = 'downvote';
      getAllVotesForQuestion(req, res, voteType);
    }
  }]);

  return VoteController;
}();

exports.default = VoteController;