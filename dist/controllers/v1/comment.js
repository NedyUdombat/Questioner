'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbConfig = require('../../database/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _comment = require('../../models/v1/comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _commentQuestion = _comment2.default.commentQuestion,
    _getAllComments = _comment2.default.getAllComments,
    _getAllCommentsForQuestion = _comment2.default.getAllCommentsForQuestion,
    _getAllCommentsByUser = _comment2.default.getAllCommentsByUser;

var CommentController = function () {
  function CommentController() {
    _classCallCheck(this, CommentController);
  }

  _createClass(CommentController, null, [{
    key: 'getAllComments',
    value: function getAllComments(req, res) {
      _getAllComments().then(function (comments) {
        if (comments.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retreived all comments',
            data: comments.rows
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'No comments'
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 500,
          error: error
        });
      });
    }
  }, {
    key: 'getAllCommentsForQuestion',
    value: function getAllCommentsForQuestion(req, res) {
      var questionId = req.params.questionId;

      _getAllCommentsForQuestion(questionId).then(function (comments) {
        if (comments.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retreived all comments',
            data: comments.rows
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'No comments For this question'
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 500,
          error: error
        });
      });
    }
  }, {
    key: 'getAllCommentsByUser',
    value: function getAllCommentsByUser(req, res) {
      var id = req.authData.id;

      var userId = id;
      _getAllCommentsByUser(userId).then(function (comments) {
        if (comments.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retreived all your comments',
            data: comments.rows
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'No comments For this user'
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
      var id = req.authData.id;

      var userId = id;
      var comment = {
        questionId: questionId,
        userId: userId,
        comment: req.body.body
      };
      _dbConfig2.default.query('SELECT * FROM questions WHERE id = ' + questionId).then(function (retreivedQuestion) {
        _commentQuestion(comment).then(function (results) {
          var newData = {
            questionId: questionId,
            userId: userId,
            title: retreivedQuestion.rows[0].title,
            body: retreivedQuestion.rows[0].body,
            comment: results.rows[0].comment
          };
          return res.status(201).json({
            status: 201,
            message: 'Successfully commented',
            data: newData
          });
        }).catch(function (error) {
          return res.status(500).json({
            status: 500,
            error: error
          });
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 500,
          error: error
        });
      });
    }
  }]);

  return CommentController;
}();

exports.default = CommentController;