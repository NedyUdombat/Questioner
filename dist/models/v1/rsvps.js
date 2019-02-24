'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbConfig = require('../../database/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rsvps = function () {
  function Rsvps() {
    _classCallCheck(this, Rsvps);
  }

  _createClass(Rsvps, null, [{
    key: 'getAllRsvps',
    value: function getAllRsvps() {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM rsvps').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getAllRsvpsForMeetup',
    value: function getAllRsvpsForMeetup(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM rsvps WHERE meetup_id = ' + id).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getAllUsersComingForAMeetup',
    value: function getAllUsersComingForAMeetup(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM rsvps WHERE meetup_id = ' + id + ' AND response = \'yes\'').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getAllRsvpsByUser',
    value: function getAllRsvpsByUser(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM rsvps WHERE user_id = ' + id + ' AND response = \'yes\'').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'rsvpMeetup',
    value: function rsvpMeetup(rsvp) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('INSERT INTO rsvps ( meetup_id, user_id, response) VALUES (' + rsvp.meetupId + ', ' + rsvp.userId + ', \'' + rsvp.status + '\')  returning *').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getAllSpecificRsvpByUser',
    value: function getAllSpecificRsvpByUser(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM rsvps WHERE meetup_id = ' + id.meetupId + ' AND user_id = ' + id.userId).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'changeRsvpMeetup',
    value: function changeRsvpMeetup(rsvp, newResponse) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('UPDATE rsvps SET response = \'' + newResponse + '\' WHERE meetup_id = ' + rsvp.meetupId + ' AND user_id = ' + rsvp.userId + '   returning *').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'checkRsvpMeetup',
    value: function checkRsvpMeetup(rsvp) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM rsvps WHERE meetup_id = ' + rsvp.meetupId + ' AND user_id = ' + rsvp.userId).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return Rsvps;
}();

exports.default = Rsvps;