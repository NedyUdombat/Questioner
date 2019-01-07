'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dummyQuestion = require('../dummyModel/dummyQuestion');

var _dummyQuestion2 = _interopRequireDefault(_dummyQuestion);

var _dummyMeetups = require('../dummyModel/dummyMeetups');

var _dummyMeetups2 = _interopRequireDefault(_dummyMeetups);

var _dummyUser = require('../dummyModel/dummyUser');

var _dummyUser2 = _interopRequireDefault(_dummyUser);

var _post_validators = require('../_helpers/post_validators');

var _post_validators2 = _interopRequireDefault(_post_validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var upcount = 1;
var downcount = 1;

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


      var fields = {
        user: user,
        meetup: meetup,
        title: title,
        body: body
      };
      var validator = new _post_validators2.default();
      validator.validate(fields, 'required|string');

      if (!validator.hasErrors) {
        var foundUsername = _dummyUser2.default.find(function (aUser) {
          return aUser.username === req.body.user;
        });
        var foundMeetup = _dummyMeetups2.default.find(function (aMeetup) {
          return aMeetup.topic === req.body.meetup;
        });

        if (foundUsername && foundMeetup) {
          var id = _dummyQuestion2.default.length + 1;
          var userId = foundUsername.id;
          var meetupId = foundMeetup.id;
          var isDuplicate = false;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _dummyQuestion2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var question = _step.value;

              isDuplicate = question.meetup === fields.meetup && question.title === fields.title && question.body === fields.body;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (isDuplicate) {
            return res.status(409).json({ error: 'This question \'' + fields.title + '\' has already been asked for this meetup' });
          }
          var votes = 0;
          var questionDetail = {
            id: id,
            user: user,
            meetup: meetup,
            title: title,
            body: body,
            votes: votes,
            createdOn: new Date()
          };
          _dummyQuestion2.default.push(questionDetail);
          var resDetails = {
            userId: userId,
            meetupId: meetupId,
            title: title,
            body: body
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
      return res.status(400).json({
        errorMessages: validator.getErrors()
      });
    }
  }, {
    key: 'upVote',
    value: function upVote(req, res) {
      var user = req.body.user;

      var fields = {
        user: user
      };
      var validator = new _post_validators2.default();
      validator.validate(fields, 'required|string');
      if (!validator.hasErrors) {
        var foundUsername = _dummyUser2.default.find(function (aUser) {
          return aUser.username === req.body.user;
        });
        var questionId = parseInt(req.params.id, 10);
        var foundQuestion = _dummyQuestion2.default.find(function (question) {
          return question.id === questionId;
        }, 10);
        if (foundUsername && foundQuestion) {
          var votes = foundQuestion.votes;
          if (upcount % 2 !== 0) {
            var totalVote = votes + 1;
            foundQuestion.votes = totalVote;

            var upVote = '+1';
            var resDetail = {
              meetup: foundQuestion.meetup,
              title: foundQuestion.title,
              body: foundQuestion.body,
              votes: votes,
              upVote: upVote,
              totalVote: totalVote
            };
            upcount += 1;
            return res.status(200).json({
              status: 200,
              message: 'Upvote successful',
              data: resDetail
            });
          }
          return res.status(409).json({
            status: 409,
            message: 'You can only upvote a question once'
          });
        }
        return res.status(404).json({
          error: 'User or Question does not exist'
        });
      }
      return res.status(400).json({
        errorMessages: validator.getErrors()
      });
    }
  }, {
    key: 'downVote',
    value: function downVote(req, res) {
      var user = req.body.user;

      var fields = {
        user: user
      };
      var validator = new _post_validators2.default();
      validator.validate(fields, 'required|string');
      if (!validator.hasErrors) {
        var foundUsername = _dummyUser2.default.find(function (aUser) {
          return aUser.username === req.body.user;
        });
        var questionId = parseInt(req.params.id, 10);
        var foundQuestion = _dummyQuestion2.default.find(function (question) {
          return question.id === questionId;
        }, 10);
        if (foundUsername && foundQuestion) {
          var votes = foundQuestion.votes;
          if (downcount % 2 !== 0) {
            var totalVote = votes - 1;
            foundQuestion.votes = totalVote;

            var downVote = '-1';
            var resDetail = {
              meetup: foundQuestion.meetup,
              title: foundQuestion.title,
              body: foundQuestion.body,
              votes: votes,
              downVote: downVote,
              totalVote: totalVote
            };
            downcount += 1;
            return res.status(200).json({
              status: 200,
              message: 'Downvote successful',
              data: resDetail
            });
          }
          return res.status(409).json({
            status: 409,
            message: 'You can only downvote a question once'
          });
        }
        return res.status(404).json({
          error: 'User or Question does not exist'
        });
      }
      return res.status(400).json({
        errorMessages: validator.getErrors()
      });
    }
  }]);

  return QuestionController;
}();

exports.default = QuestionController;