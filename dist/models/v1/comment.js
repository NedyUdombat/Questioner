'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbConfig = require('../../database/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Comment = function () {
  function Comment() {
    _classCallCheck(this, Comment);
  }

  _createClass(Comment, null, [{
    key: 'getAllComments',
    value: function getAllComments() {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM comments').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getAllCommentsForQuestion',
    value: function getAllCommentsForQuestion(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM comments where question_id = ' + id).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getAllCommentsByUser',
    value: function getAllCommentsByUser(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM comments where user_id = ' + id).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'commentQuestion',
    value: function commentQuestion(question) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('INSERT INTO comments ( question_id, user_id, comment) VALUES (' + question.questionId + ', ' + question.userId + ', \'' + question.comment + '\') returning *').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return Comment;
}();

exports.default = Comment;