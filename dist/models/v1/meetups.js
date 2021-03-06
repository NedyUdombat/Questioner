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

var Meetups = function () {
  function Meetups() {
    _classCallCheck(this, Meetups);
  }

  _createClass(Meetups, null, [{
    key: 'getAll',
    value: function getAll() {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM meetups').then(function (results) {
          return resolve(results);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getSpecific',
    value: function getSpecific(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM meetups WHERE id = ' + id).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getUpcoming',
    value: function getUpcoming() {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('SELECT * FROM meetups WHERE happening_on > to_date(\'' + (0, _moment2.default)().format('YYYY-MM-DD') + '\', \'YYYY MM DD\')').then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'create',
    value: function create(details) {
      var newHappeningOn = (0, _moment2.default)(details.happeningOn).format('YYYY-MM-DD');
      var meetupDetails = {
        organizer_name: details.organizerName,
        topic: details.topic,
        location: details.location,
        happeningOn: newHappeningOn,
        tags: details.tags ? details.tags : '{}',
        images: details.images ? details.images : '{}',
        createdOn: (0, _moment2.default)().format()
      };
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('INSERT INTO meetups ( organizer_name, topic, location, happening_On, tags, images, created_on) VALUES (\'' + meetupDetails.organizer_name + '\', \'' + meetupDetails.topic + '\',\'' + meetupDetails.location + '\', \'' + meetupDetails.happeningOn + '\', \'' + meetupDetails.tags + '\', \'' + meetupDetails.images + '\', \'' + meetupDetails.createdOn + '\') returning *').then(function (results) {
          return resolve(results);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'deleteSpecific',
    value: function deleteSpecific(id) {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('DELETE FROM meetups WHERE id = ' + id).then(function (results) {
          return resolve(results);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'deleteAllMeetups',
    value: function deleteAllMeetups() {
      return new Promise(function (resolve, reject) {
        _dbConfig2.default.query('DELETE FROM meetups').then(function (results) {
          return resolve(results);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return Meetups;
}();

exports.default = Meetups;