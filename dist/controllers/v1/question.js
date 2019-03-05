'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _question = require('../../models/v1/question');

var _question2 = _interopRequireDefault(_question);

var _user = require('../../models/v1/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _getAllQuestions = _question2.default.getAllQuestions,
    _getAllQuestionsForMeetup = _question2.default.getAllQuestionsForMeetup,
    _getAllQuestionsByUser = _question2.default.getAllQuestionsByUser,
    askQuestion = _question2.default.askQuestion,
    _getSpecificQuestion = _question2.default.getSpecificQuestion;
var getSpecificUser = _user2.default.getSpecificUser;

var QuestionController = function () {
  function QuestionController() {
    _classCallCheck(this, QuestionController);
  }

  _createClass(QuestionController, null, [{
    key: 'getAllQuestions',
    value: function getAllQuestions(req, res) {
      _getAllQuestions().then(function (results) {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            data: results.rows
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'No question has been asked so far'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: 'getAllQuestionsForMeetup',
    value: function getAllQuestionsForMeetup(req, res) {
      var meetupId = req.params.meetupId;

      _getAllQuestionsForMeetup(meetupId).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            amount: results.rowCount,
            data: results.rows
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'No question has been asked so far'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      });
    }
  }, {
    key: 'getAllQuestionsByUser',
    value: function getAllQuestionsByUser(req, res) {
      var userId = req.authData.id;
      getSpecificUser(userId).then(function (user) {
        var userDetails = {
          fullname: user.rows[0].firstname + ' ' + user.rows[0].lastname,
          username: user.rows[0].username
        };
        _getAllQuestionsByUser(userId).then(function (results) {
          if (results.rowCount > 0) {
            return res.status(200).json({
              status: 200,
              data: results.rows,
              userDetails: userDetails
            });
          }
          return res.status(404).json({
            status: 404,
            data: 'No question has been asked so far'
          });
        }).catch(function (error) {
          return res.status(400).json({
            status: 400,
            error: error.message
          });
        });
      }).catch(function (error) {
        return res.status(500).json({ status: 500, error: error });
      });
    }
  }, {
    key: 'getSpecificQuestion',
    value: function getSpecificQuestion(req, res) {
      var questionId = req.params.questionId;

      _getSpecificQuestion(questionId).then(function (question) {
        var userId = question.rows[0].user_id;
        getSpecificUser(userId).then(function (user) {
          return res.status(200).json({
            question: question.rows[0],
            user: user.rows[0]
          });
        }).catch(function (error) {
          return res.status(500).json({ status: 500, error: error });
        });
      }).catch(function (error) {
        return res.status(500).json({ status: 500, error: error });
      });
    }
  }, {
    key: 'createQuestion',
    value: function createQuestion(req, res) {
      var meetupId = req.body.meetupId;
      var question = {
        meetupId: meetupId,
        userId: req.authData.id,
        title: req.body.title,
        body: req.body.body
      };
      askQuestion(question).then(function (results) {
        return res.status(201).json({
          status: 201,
          message: 'Question asked successfully',
          data: results.rows
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 500,
          error: error
        });
      });
    }
  }]);

  return QuestionController;
}();

exports.default = QuestionController;