'use strict';

var _dbConfig = require('./dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _seed = require('./seed');

var _seed2 = _interopRequireDefault(_seed);

var _drop = require('./drop');

var _drop2 = _interopRequireDefault(_drop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import createMigrations from './create-migrations';
// import dropMigrations from './drop-migrations';
// import seedMigrations from './seed-migrations';


var queryMigrations = function () {
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
            _context.next = 17;
            return _dbConfig2.default.query(_create2.default.meetupsTable);

          case 17:
            _context.next = 19;
            return _dbConfig2.default.query(_create2.default.usersTable);

          case 19:
            _context.next = 21;
            return _dbConfig2.default.query(_create2.default.questionsTable);

          case 21:
            _context.next = 23;
            return _dbConfig2.default.query(_create2.default.rsvpsTable);

          case 23:
            _context.next = 25;
            return _dbConfig2.default.query(_create2.default.commentsTable);

          case 25:
            _context.next = 27;
            return _dbConfig2.default.query(_create2.default.votesTable);

          case 27:
            _context.next = 29;
            return _dbConfig2.default.query(_seed2.default.meetupsTable);

          case 29:
            _context.next = 31;
            return _dbConfig2.default.query(_seed2.default.usersTable);

          case 31:
            _context.next = 33;
            return _dbConfig2.default.query(_seed2.default.questionsTable);

          case 33:
            _context.next = 35;
            return _dbConfig2.default.query(_seed2.default.rsvpsTable);

          case 35:
            _context.next = 37;
            return _dbConfig2.default.query(_seed2.default.commentsTable);

          case 37:
            _context.next = 39;
            return _dbConfig2.default.query(_seed2.default.votesTable);

          case 39:
            _context.next = 44;
            break;

          case 41:
            _context.prev = 41;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 44:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 41]]);
  }));

  return function queryMigrations() {
    return _ref.apply(this, arguments);
  };
}();

queryMigrations();