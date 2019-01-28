'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dbConfig = require('../../dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _drop = require('./drop');

var _drop2 = _interopRequireDefault(_drop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var dropMigrations = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _dbConfig2.default.query(_drop2.default.votesTable);

          case 3:
            _context.next = 5;
            return _dbConfig2.default.query(_drop2.default.type);

          case 5:
            _context.next = 7;
            return _dbConfig2.default.query(_drop2.default.commentsTable);

          case 7:
            _context.next = 9;
            return _dbConfig2.default.query(_drop2.default.rsvpsTable);

          case 9:
            _context.next = 11;
            return _dbConfig2.default.query(_drop2.default.questionsTable);

          case 11:
            _context.next = 13;
            return _dbConfig2.default.query(_drop2.default.usersTable);

          case 13:
            _context.next = 15;
            return _dbConfig2.default.query(_drop2.default.meetupsTable);

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 17]]);
  }));

  return function dropMigrations() {
    return _ref.apply(this, arguments);
  };
}();

dropMigrations();

exports.default = dropMigrations();