'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dbConfig = require('./dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Questions = function () {
  function Questions() {
    _classCallCheck(this, Questions);
  }

  _createClass(Questions, null, [{
    key: 'getAllQuestions',
    value: function getAllQuestions() {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM questions').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getAllQuestionsForMeetup',
    value: function getAllQuestionsForMeetup(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM questions where meetup_id = ' + id).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getAllQuestionsByUser',
    value: function getAllQuestionsByUser(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM questions where user_id = ' + id).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'askQuestion',
    value: function askQuestion(question) {
      var createdOn = (0, _moment2.default)().format();
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('INSERT INTO questions ( meetup_id, user_id, title, body, created_on) VALUES (' + question.meetupId + ', ' + question.userId + ', \'' + question.title + '\', \'' + question.body + '\', \'' + createdOn + '\') returning *').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
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
  }, {
    key: 'getAllVotesByUser',
    value: function getAllVotesByUser(voteType, id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM votes where vote_type = \'' + voteType + '\' AND user_id = ' + id.userId + ' AND question_id = ' + id.questionId).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'voteQuestion',
    value: function voteQuestion(question) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('INSERT INTO votes (user_id, question_id, vote_type) VALUES (' + question.userId + ', ' + question.questionId + ', \'' + question.voteType + '\') returning *').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return Questions;
}();

exports.default = Questions;