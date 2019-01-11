'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _questions = require('../../models/v1/questions');

var _questions2 = _interopRequireDefault(_questions);

var _meetups = require('../../models/v1/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

var _users = require('../../models/v1/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Validator from '../../_helpers/post_validators';


var QuestionController = function () {
  function QuestionController() {
    _classCallCheck(this, QuestionController);
  }

  _createClass(QuestionController, null, [{
    key: 'createQuestion',
    value: function createQuestion(req, res) {
      var _req$body = req.body,
          user = _req$body.user,
          meetup = _req$body.meetup,
          title = _req$body.title,
          body = _req$body.body;

      var foundUsername = _users2.default.find(function (aUser) {
        return aUser.username === req.body.user;
      });
      var foundMeetup = _meetups2.default.find(function (aMeetup) {
        return aMeetup.topic === req.body.meetup;
      });

      if (foundUsername && foundMeetup) {
        var id = _questions2.default.length + 1;
        var questionDetail = {
          id: id, user: user, meetup: meetup, title: title, body: body, upvotes: '0', downvotes: '0', createdOn: new Date()
        };
        _questions2.default.push(questionDetail);
        var resDetails = {
          userId: foundUsername.id, meetupId: foundMeetup.id, title: title, body: body
        };
        return res.status(201).json({
          status: 201,
          message: 'Question asked successfully',
          data: resDetails
        });
      }
      return res.status(404).json({
        error: 'User or Meetup does not exist'
      });
    }
  }, {
    key: 'upVote',
    value: function upVote(req, res) {
      var questionId = req.params.questionId;

      var foundUsername = _users2.default.find(function (aUser) {
        return aUser.username === req.body.user;
      });
      var foundQuestion = _questions2.default.find(function (question) {
        return question.id === parseInt(questionId, 10);
      });
      if (foundUsername && foundQuestion) {
        var upvotes = foundQuestion.upvotes;
        var totalVote = upvotes + 1;
        foundQuestion.votes = totalVote;

        var resDetail = {
          meetup: foundQuestion.meetup,
          title: foundQuestion.title,
          body: foundQuestion.body,
          upvotes: upvotes,
          upVote: '+1',
          totalVote: totalVote
        };
        return res.status(200).json({
          status: 200,
          message: 'Upvote successful',
          data: resDetail
        });
      }
      return res.status(404).json({
        error: 'User or Question does not exist'
      });
    }
  }, {
    key: 'downVote',
    value: function downVote(req, res) {
      var questionId = req.params.questionId;

      var foundUsername = _users2.default.find(function (aUser) {
        return aUser.username === req.body.user;
      });
      var foundQuestion = _questions2.default.find(function (question) {
        return question.id === parseInt(questionId, 10);
      });
      if (foundUsername && foundQuestion) {
        var downvotes = foundQuestion.downvotes;
        var totalVote = downvotes - 1;
        foundQuestion.downvotes = totalVote;

        var resDetail = {
          meetup: foundQuestion.meetup,
          title: foundQuestion.title,
          body: foundQuestion.body,
          downvotes: downvotes,
          downVote: '-1',
          totalVote: totalVote
        };
        return res.status(200).json({
          status: 200,
          message: 'Downvote successful',
          data: resDetail
        });
      }
      return res.status(404).json({
        error: 'User or Question does not exist'
      });
    }
  }]);

  return QuestionController;
}();

exports.default = QuestionController;