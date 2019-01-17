'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var connectionString = void 0;
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DB_TEST_URL;
} else if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DB_URL;
} else {
  connectionString = process.env.DATABASE_URL;
}

var pool = new _pg.Pool({
  connectionString: connectionString
});
exports.default = {
  query: function query(queries) {
    return new Promise(function (resolve, reject) {
      pool.query(queries).then(function (res) {
        resolve(res);
      }, function (err) {
        reject(err);
      });
    });
  }
};