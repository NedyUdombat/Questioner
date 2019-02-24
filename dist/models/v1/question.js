'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dbConfig = require('../../database/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Question = function () {
  function Question() {
    _classCallCheck(this, Question);
  }

  _createClass(Question, null, [{
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
    key: 'getSpecificQuestionsForMeetupByUser',
    value: function getSpecificQuestionsForMeetupByUser(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM questions where meetup_id = ' + id.meetupId + ' AND user_id = ' + id.userId).then(function (response) {
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
    key: 'getSpecificQuestion',
    value: function getSpecificQuestion(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM questions where id = ' + id).then(function (response) {
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
  }]);

  return Question;
}();

exports.default = Question;