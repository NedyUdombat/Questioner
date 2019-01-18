'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dbConfig = require('../../models/v1/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _questions = require('../../models/v1/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var secretHash = process.env.SECRET_KEY;

var _getAllQuestions = _questions2.default.getAllQuestions,
    askQuestion = _questions2.default.askQuestion,
    voteQuestion = _questions2.default.voteQuestion,
    _commentQuestion = _questions2.default.commentQuestion;

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
    key: 'createQuestion',
    value: function createQuestion(req, res) {
      var meetupId = req.body.meetupId;
      var jwToken = req.headers['x-access-token'];
      var userId = void 0;
      _jsonwebtoken2.default.verify(jwToken, secretHash, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        userId = decoded.id;
      });
      var question = {
        meetupId: meetupId,
        userId: userId,
        title: req.body.title,
        body: req.body.body
      };
      askQuestion(question).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Question asked successfully',
            data: results.rows
          });
        }
        return res.json(400).json({
          status: 400,
          error: 'Question could not be asked'
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 500,
          error: error
        });
      });
    }
  }, {
    key: 'upVote',
    value: function upVote(req, res) {
      var questionId = req.params.questionId;
      var jwToken = req.headers['x-access-token'];
      var userId = void 0;
      _jsonwebtoken2.default.verify(jwToken, secretHash, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        userId = decoded.id;
      });
      var question = {
        userId: userId,
        questionId: questionId,
        voteType: 'upvote'
      };
      voteQuestion(question).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Upvote successful',
            data: results.rows
          });
        }
        return res.status(400).json({
          status: 400,
          message: 'Question upvote unsuccessful'
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 500,
          error: error
        });
      });
    }
  }, {
    key: 'downVote',
    value: function downVote(req, res) {
      var questionId = req.params.questionId;
      var jwToken = req.headers['x-access-token'];
      var userId = void 0;
      _jsonwebtoken2.default.verify(jwToken, secretHash, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        userId = decoded.id;
      });
      var question = {
        userId: userId,
        questionId: questionId,
        voteType: 'downvote'
      };
      voteQuestion(question).then(function (results) {
        if (results.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Question downvote successful',
            data: results.rows
          });
        }
        return res.status(400).json({
          status: 400,
          message: 'Question downvote unsuccessful'
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 500,
          error: error
        });
      });
    }
  }, {
    key: 'commentQuestion',
    value: function commentQuestion(req, res) {
      var questionId = parseInt(req.params.questionId, 10);
      var jwToken = req.headers['x-access-token'];
      var userId = void 0;
      _jsonwebtoken2.default.verify(jwToken, secretHash, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        userId = decoded.id;
      });
      var comment = {
        questionId: questionId,
        userId: userId,
        comment: req.body.body
      };
      _dbConfig2.default.query('SELECT * FROM questions WHERE id = ' + questionId).then(function (retreivedQuestion) {
        if (retreivedQuestion.rowCount > 0) {
          console.log(retreivedQuestion.rows);
          var newData = {
            questionId: questionId,
            userId: userId,
            title: retreivedQuestion.rows[0].title,
            body: retreivedQuestion.rows[0].body,
            comment: comment.comment
          };
          _commentQuestion(comment).then(function (results) {
            if (results.rowCount > 0) {
              return res.status(201).json({
                status: 201,
                message: 'Successfully commented',
                data: newData
              });
            }
            return res.json(400).json({
              status: 400,
              error: 'could not comment'
            });
          }).catch(function (error) {
            return res.status(500).json({
              status: 500,
              error: error
            });
          });
        }
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