'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbConfig = require('../../database/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vote = function () {
  function Vote() {
    _classCallCheck(this, Vote);
  }

  _createClass(Vote, null, [{
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

  return Vote;
}();

exports.default = Vote;