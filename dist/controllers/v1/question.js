'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _question = require('../../models/v1/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _getAllQuestions = _question2.default.getAllQuestions,
    _getAllQuestionsForMeetup = _question2.default.getAllQuestionsForMeetup,
    _getAllQuestionsByUser = _question2.default.getAllQuestionsByUser,
    askQuestion = _question2.default.askQuestion;

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
      _getAllQuestionsByUser(userId).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(200).json({
            status: 200,
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